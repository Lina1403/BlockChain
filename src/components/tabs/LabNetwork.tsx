import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Activity, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { LabNetwork as ILabNetwork } from '../../types';

const LabNetwork: React.FC = () => {
  const [labs, setLabs] = useState<ILabNetwork[]>([]);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);

  useEffect(() => {
    // Simulate lab network data
    const mockLabs: ILabNetwork[] = [
      {
        id: '1',
        name: 'BioSynth Labs Boston',
        location: 'Boston, MA, USA',
        status: 'active',
        capacity: 95,
        successRate: 99.8,
        averageTime: 3.2,
      },
      {
        id: '2',
        name: 'GeneTech Europe',
        location: 'Geneva, Switzerland',
        status: 'busy',
        capacity: 78,
        successRate: 99.5,
        averageTime: 4.1,
      },
      {
        id: '3',
        name: 'DNA Synthesis Tokyo',
        location: 'Tokyo, Japan',
        status: 'active',
        capacity: 60,
        successRate: 99.9,
        averageTime: 2.8,
      },
      {
        id: '4',
        name: 'BioFab Singapore',
        location: 'Singapore',
        status: 'active',
        capacity: 85,
        successRate: 99.7,
        averageTime: 3.5,
      },
      {
        id: '5',
        name: 'HeliX Labs London',
        location: 'London, UK',
        status: 'offline',
        capacity: 0,
        successRate: 99.3,
        averageTime: 4.0,
      },
      {
        id: '6',
        name: 'BioCode Berlin',
        location: 'Berlin, Germany',
        status: 'active',
        capacity: 70,
        successRate: 99.6,
        averageTime: 3.8,
      },
    ];

    setLabs(mockLabs);
  }, []);

  const getStatusColor = (status: ILabNetwork['status']) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'busy': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: ILabNetwork['status']) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'busy': return Clock;
      case 'offline': return AlertCircle;
      default: return Activity;
    }
  };

  const LabCard: React.FC<{ lab: ILabNetwork }> = ({ lab }) => {
    const StatusIcon = getStatusIcon(lab.status);
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedLab(selectedLab === lab.id ? null : lab.id)}
        className={`bg-white/10 backdrop-blur-lg rounded-lg p-6 border cursor-pointer transition-all ${
          selectedLab === lab.id 
            ? 'border-cyan-400 ring-2 ring-cyan-400/50' 
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{lab.name}</h3>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{lab.location}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <StatusIcon className={`h-5 w-5 ${getStatusColor(lab.status)}`} />
            <span className={`text-sm font-medium capitalize ${getStatusColor(lab.status)}`}>
              {lab.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-cyan-400">{lab.capacity}%</div>
            <div className="text-xs text-gray-400">Capacity</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">{lab.successRate}%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">{lab.averageTime}d</div>
            <div className="text-xs text-gray-400">Avg. Time</div>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div 
            className={`h-2 rounded-full transition-all ${
              lab.capacity > 80 ? 'bg-red-400' :
              lab.capacity > 60 ? 'bg-yellow-400' : 'bg-green-400'
            }`}
            style={{ width: `${lab.capacity}%` }}
          />
        </div>

        {selectedLab === lab.id && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/20"
          >
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Current Orders:</span>
                <span className="text-white font-medium">{Math.floor(Math.random() * 50) + 10}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Equipment Status:</span>
                <span className="text-green-400 font-medium">Operational</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Next Available:</span>
                <span className="text-white font-medium">
                  {new Date(Date.now() + Math.random() * 72 * 3600000).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Specializations:</span>
                <span className="text-cyan-400 font-medium">Standard, Express</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Laboratory Network</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-cyan-400" />
            <span className="text-white font-medium">{labs.length} Labs</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">
              {labs.filter(lab => lab.status === 'active').length} Active
            </span>
          </div>
        </div>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-white font-medium">Active Labs</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {labs.filter(lab => lab.status === 'active').length}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="h-6 w-6 text-cyan-400" />
            <span className="text-white font-medium">Avg. Success Rate</span>
          </div>
          <div className="text-2xl font-bold text-cyan-400">
            {(labs.reduce((acc, lab) => acc + lab.successRate, 0) / labs.length).toFixed(1)}%
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <Clock className="h-6 w-6 text-purple-400" />
            <span className="text-white font-medium">Avg. Processing</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {(labs.reduce((acc, lab) => acc + lab.averageTime, 0) / labs.length).toFixed(1)}d
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
          <div className="flex items-center space-x-3 mb-2">
            <MapPin className="h-6 w-6 text-orange-400" />
            <span className="text-white font-medium">Global Coverage</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">
            {new Set(labs.map(lab => lab.location.split(', ').pop())).size} Countries
          </div>
        </div>
      </div>

      {/* Lab Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      {/* Network Statistics */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
        <h4 className="text-xl font-bold text-white mb-4">Network Performance</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Overall Health</span>
              <span className="text-green-400 font-medium">Excellent</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Capacity Utilization</span>
              <span className="text-yellow-400 font-medium">High</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '76%' }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Quality Score</span>
              <span className="text-cyan-400 font-medium">Outstanding</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '98%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
        <h4 className="text-xl font-bold text-white mb-4">Recent Network Activity</h4>
        
        <div className="space-y-3">
          {[
            { time: '2 minutes ago', event: 'BioSynth Labs Boston completed synthesis order #1247', type: 'success' },
            { time: '15 minutes ago', event: 'DNA Synthesis Tokyo started new batch processing', type: 'info' },
            { time: '1 hour ago', event: 'GeneTech Europe reported 99.9% success rate this week', type: 'success' },
            { time: '2 hours ago', event: 'HeliX Labs London temporarily offline for maintenance', type: 'warning' },
            { time: '3 hours ago', event: 'BioFab Singapore achieved new speed record: 2.1 days', type: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 py-2">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-green-400' :
                activity.type === 'warning' ? 'bg-yellow-400' : 'bg-cyan-400'
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
  );
};

export default LabNetwork;