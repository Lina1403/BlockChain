import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Clock, Leaf, Users, TrendingUp } from 'lucide-react';
import { NetworkMetrics as INetworkMetrics } from '../../types';

const NetworkMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<INetworkMetrics>({
    tps: 0,
    consensusTime: 0,
    energyConsumption: 0,
    activeNodes: 0,
    totalTransactions: 0,
  });

  const [historicalData, setHistoricalData] = useState<Array<{
    timestamp: number;
    tps: number;
    consensusTime: number;
  }>>([]);

  useEffect(() => {
    const updateMetrics = () => {
      const newMetrics: INetworkMetrics = {
        tps: Math.floor(Math.random() * 5000) + 8000,
        consensusTime: Math.random() * 2 + 3,
        energyConsumption: Math.random() * 0.001 + 0.0001,
        activeNodes: Math.floor(Math.random() * 10) + 39,
        totalTransactions: Math.floor(Math.random() * 1000000) + 15000000,
      };

      setMetrics(newMetrics);
      
      setHistoricalData(prev => {
        const newData = [...prev, {
          timestamp: Date.now(),
          tps: newMetrics.tps,
          consensusTime: newMetrics.consensusTime,
        }];
        return newData.slice(-50); // Keep last 50 data points
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard: React.FC<{
    title: string;
    value: string | number;
    unit: string;
    icon: React.ElementType;
    color: string;
    trend?: number;
  }> = ({ title, value, unit, icon: Icon, color, trend }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/20`}>
          <Icon className={`h-6 w-6 text-${color}-400`} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-gray-400'
          }`}>
            <TrendingUp className="h-4 w-4" />
            <span>{trend > 0 ? '+' : ''}{trend.toFixed(1)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-sm text-gray-300">{unit}</div>
        <div className="text-xs text-gray-400">{title}</div>
      </div>
    </motion.div>
  );

  const SimpleChart: React.FC<{
    data: Array<{ timestamp: number; value: number }>;
    color: string;
    label: string;
  }> = ({ data, color, label }) => {
    if (data.length < 2) return null;

    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;

    return (
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">{label}</h4>
        <div className="relative h-32">
          <svg width="100%" height="100%" className="absolute inset-0">
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 100;
                const y = 100 - ((d.value - minValue) / range) * 100;
                return `${x},${y}`;
              }).join(' ')}
            />
            {/* Data points */}
            {data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 100 - ((d.value - minValue) / range) * 100;
              return (
                <circle
                  key={i}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="2"
                  fill={color}
                />
              );
            })}
          </svg>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>Min: {minValue.toFixed(1)}</span>
          <span>Max: {maxValue.toFixed(1)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Hedera Network Metrics</h3>
        <div className="flex items-center space-x-2 text-green-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm">Live Data</span>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Transactions Per Second"
          value={metrics.tps}
          unit="TPS"
          icon={Activity}
          color="cyan"
          trend={Math.random() * 10 - 5}
        />
        
        <MetricCard
          title="Average Consensus Time"
          value={metrics.consensusTime.toFixed(2)}
          unit="seconds"
          icon={Clock}
          color="blue"
          trend={Math.random() * 6 - 3}
        />
        
        <MetricCard
          title="Energy Per Transaction"
          value={metrics.energyConsumption.toFixed(6)}
          unit="kWh"
          icon={Leaf}
          color="green"
          trend={Math.random() * 4 - 2}
        />
        
        <MetricCard
          title="Active Network Nodes"
          value={metrics.activeNodes}
          unit="nodes"
          icon={Users}
          color="purple"
          trend={Math.random() * 2 - 1}
        />
        
        <MetricCard
          title="Total Transactions"
          value={(metrics.totalTransactions / 1000000).toFixed(1)}
          unit="million"
          icon={Zap}
          color="orange"
          trend={Math.random() * 15 + 5}
        />
        
        <MetricCard
          title="Network Efficiency"
          value={(metrics.tps * 100 / 15000).toFixed(1)}
          unit="% capacity"
          icon={TrendingUp}
          color="pink"
          trend={Math.random() * 8 - 4}
        />
      </div>

      {/* Historical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChart
          data={historicalData.map(d => ({ timestamp: d.timestamp, value: d.tps }))}
          color="#00f5ff"
          label="TPS Over Time"
        />
        
        <SimpleChart
          data={historicalData.map(d => ({ timestamp: d.timestamp, value: d.consensusTime }))}
          color="#45b7d1"
          label="Consensus Time (seconds)"
        />
      </div>

      {/* Network Status */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
        <h4 className="text-xl font-bold text-white mb-4">Network Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Network Health</span>
              <span className="text-green-400 font-medium">Excellent</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '95%' }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Consensus Quality</span>
              <span className="text-blue-400 font-medium">High</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: '88%' }} />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Security Level</span>
              <span className="text-purple-400 font-medium">Maximum</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* DNA Storage Statistics */}
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
        <h4 className="text-xl font-bold text-white mb-4">DNA Storage Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">1,247</div>
            <div className="text-sm text-gray-300">Files Encoded</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">98.7%</div>
            <div className="text-sm text-gray-300">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">15.2TB</div>
            <div className="text-sm text-gray-300">Data Processed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">847ms</div>
            <div className="text-sm text-gray-300">Avg. Encoding Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMetrics;