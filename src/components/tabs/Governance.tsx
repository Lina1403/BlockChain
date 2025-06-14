import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Vote, TrendingUp, Clock, CheckCircle, XCircle, Users, Coins } from 'lucide-react';
import { GovernanceProposal } from '../../types';

const Governance: React.FC = () => {
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
  const [userTokens, setUserTokens] = useState(1250);
  const [votingPower, setVotingPower] = useState(0.15);

  useEffect(() => {
    // Simulate governance proposals
    const mockProposals: GovernanceProposal[] = [
      {
        id: '1',
        title: 'Increase DNA Storage Redundancy Factor',
        description: 'Proposal to increase the default redundancy factor from 3x to 5x for improved data integrity and recovery capabilities.',
        votesFor: 75680,
        votesAgainst: 12450,
        status: 'active',
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        title: 'Add Support for Quantum-Resistant Encryption',
        description: 'Integrate quantum-resistant cryptographic algorithms to future-proof DNA sequences against quantum computing threats.',
        votesFor: 89320,
        votesAgainst: 8760,
        status: 'active',
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        title: 'Reduce Transaction Fees for Small Files',
        description: 'Lower the minimum transaction fee for files under 1MB to make DNA storage more accessible for individual users.',
        votesFor: 156780,
        votesAgainst: 45320,
        status: 'passed',
        endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        title: 'Partnership with Academic Institutions',
        description: 'Establish formal partnerships with universities for research grants and student access programs.',
        votesFor: 23450,
        votesAgainst: 67890,
        status: 'rejected',
        endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    setProposals(mockProposals);
  }, []);

  const handleVote = (proposalId: string, support: boolean) => {
    setProposals(prev => prev.map(proposal => {
      if (proposal.id === proposalId && proposal.status === 'active') {
        const voteAmount = Math.floor(userTokens * 0.1); // Use 10% of tokens
        return {
          ...proposal,
          votesFor: support ? proposal.votesFor + voteAmount : proposal.votesFor,
          votesAgainst: !support ? proposal.votesAgainst + voteAmount : proposal.votesAgainst,
        };
      }
      return proposal;
    }));
    
    // Reduce user tokens after voting
    setUserTokens(prev => prev - Math.floor(prev * 0.1));
  };

  const getStatusColor = (status: GovernanceProposal['status']) => {
    switch (status) {
      case 'active': return 'text-blue-400';
      case 'passed': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: GovernanceProposal['status']) => {
    switch (status) {
      case 'active': return Clock;
      case 'passed': return CheckCircle;
      case 'rejected': return XCircle;
      default: return Vote;
    }
  };

  const ProposalCard: React.FC<{ proposal: GovernanceProposal }> = ({ proposal }) => {
    const StatusIcon = getStatusIcon(proposal.status);
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    const supportPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
    const timeLeft = new Date(proposal.endDate).getTime() - Date.now();
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">{proposal.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{proposal.description}</p>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <StatusIcon className={`h-5 w-5 ${getStatusColor(proposal.status)}`} />
            <span className={`text-sm font-medium capitalize ${getStatusColor(proposal.status)}`}>
              {proposal.status}
            </span>
          </div>
        </div>

        {/* Voting Progress */}
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Support: {supportPercentage.toFixed(1)}%</span>
            <span className="text-gray-300">{totalVotes.toLocaleString()} total votes</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-green-400 transition-all duration-500"
                style={{ width: `${supportPercentage}%` }}
              />
              <div 
                className="bg-red-400 transition-all duration-500"
                style={{ width: `${100 - supportPercentage}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-400">
            <span>For: {proposal.votesFor.toLocaleString()}</span>
            <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
          </div>
        </div>

        {/* Time and Voting */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            {proposal.status === 'active' ? (
              daysLeft > 0 ? `${daysLeft} days left` : 'Ending soon'
            ) : (
              `Ended ${Math.abs(daysLeft)} days ago`
            )}
          </div>
          
          {proposal.status === 'active' && (
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(proposal.id, false)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded text-sm transition-colors"
              >
                Against
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(proposal.id, true)}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1 rounded text-sm transition-colors"
              >
                Support
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Governance & Voting</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">{userTokens.toLocaleString()} DNAS</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-cyan-400" />
            <span className="text-cyan-400 text-sm">{(votingPower * 100).toFixed(2)}% voting power</span>
          </div>
        </div>
      </div>

      {/* User Voting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Coins className="h-6 w-6 text-yellow-400" />
            <span className="text-white font-medium">DNAS Balance</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">
            {userTokens.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Voting power: {(votingPower * 100).toFixed(2)}%
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Vote className="h-6 w-6 text-blue-400" />
            <span className="text-white font-medium">Active Proposals</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {proposals.filter(p => p.status === 'active').length}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-white font-medium">Proposals Passed</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {proposals.filter(p => p.status === 'passed').length}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-6 w-6 text-purple-400" />
            <span className="text-white font-medium">Total Voters</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            8,247
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold text-white">Current Proposals</h4>
          <div className="flex space-x-2 text-sm">
            <span className="text-gray-300">Status:</span>
            <span className="text-blue-400">Active ({proposals.filter(p => p.status === 'active').length})</span>
            <span className="text-gray-400">•</span>
            <span className="text-green-400">Passed ({proposals.filter(p => p.status === 'passed').length})</span>
            <span className="text-gray-400">•</span>
            <span className="text-red-400">Rejected ({proposals.filter(p => p.status === 'rejected').length})</span>
          </div>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </div>

      {/* Governance Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <h4 className="text-xl font-bold text-white mb-4">How Governance Works</h4>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
              <div>
                <p className="font-medium text-white">DNAS Token Voting</p>
                <p>Your voting power is proportional to your DNAS token holdings</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
              <div>
                <p className="font-medium text-white">Proposal Threshold</p>
                <p>Proposals need 60% support to pass</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
              <div>
                <p className="font-medium text-white">Voting Period</p>
                <p>Each proposal has a 7-day voting period</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <h4 className="text-xl font-bold text-white mb-4">Recent Governance Activity</h4>
          <div className="space-y-3">
            {[
              { time: '2 hours ago', event: 'New proposal submitted: Enhanced Error Correction', type: 'info' },
              { time: '1 day ago', event: 'Proposal "Reduce Transaction Fees" passed with 77% support', type: 'success' },
              { time: '3 days ago', event: 'Voting ended for "Academic Partnership" proposal', type: 'neutral' },
              { time: '5 days ago', event: 'Community discussion started for quantum encryption', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 py-2">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'success' ? 'bg-green-400' :
                  activity.type === 'info' ? 'bg-cyan-400' : 'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.event}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Governance;