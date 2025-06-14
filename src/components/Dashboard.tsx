import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Dna, BarChart3, Book, Users, Vote } from 'lucide-react';
import { User } from '../types';
import EncodeTab from './tabs/EncodeTab';
import DecodeTab from './tabs/DecodeTab';
import DNAVisualization from './tabs/DNAVisualization';
import NetworkMetrics from './tabs/NetworkMetrics';
import Documentation from './tabs/Documentation';
import LabNetwork from './tabs/LabNetwork';
import Governance from './tabs/Governance';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('encode');

  const tabs = [
    { id: 'encode', label: 'Encode', icon: Upload },
    { id: 'decode', label: 'Decode', icon: Download },
    { id: 'visualize', label: 'DNA View', icon: Dna },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'docs', label: 'Docs', icon: Book },
    { id: 'labs', label: 'Labs', icon: Users },
    { id: 'governance', label: 'Governance', icon: Vote },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'encode':
        return <EncodeTab />;
      case 'decode':
        return <DecodeTab />;
      case 'visualize':
        return <DNAVisualization />;
      case 'metrics':
        return <NetworkMetrics />;
      case 'docs':
        return <Documentation />;
      case 'labs':
        return <LabNetwork />;
      case 'governance':
        return <Governance />;
      default:
        return <EncodeTab />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-cyan-300">
            Transform your digital data into eternal DNA sequences
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-2 mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-white shadow-lg'
                      : 'text-cyan-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden"
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;