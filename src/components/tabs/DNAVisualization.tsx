import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, Zap } from 'lucide-react';

const DNAVisualization: React.FC = () => {
  const [sequence, setSequence] = useState('ATGCATGCTAGCTAGCATGCATGCTAGCTAGCATGCATGCTAGCTAG');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [visualizationMode, setVisualizationMode] = useState<'helix' | 'sequence' | 'both'>('both');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && sequence) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sequence.length);
      }, 1000 / speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed, sequence.length]);

  const getBaseColor = (base: string) => {
    switch (base.toUpperCase()) {
      case 'A': return '#FF6B6B'; // Red
      case 'T': return '#4ECDC4'; // Teal
      case 'G': return '#45B7D1'; // Blue
      case 'C': return '#96CEB4'; // Green
      default: return '#95A5A6'; // Gray
    }
  };

  const getBasePair = (base: string) => {
    switch (base.toUpperCase()) {
      case 'A': return 'T';
      case 'T': return 'A';
      case 'G': return 'C';
      case 'C': return 'G';
      default: return 'N';
    }
  };

  const loadStoredSequence = () => {
    const stored = JSON.parse(localStorage.getItem('dna_sequences') || '[]');
    if (stored.length > 0) {
      const latestSequence = stored[stored.length - 1];
      setSequence(latestSequence.sequence.substring(0, 200)); // First 200 bases for performance
    }
  };

  const generateRandomSequence = () => {
    const bases = ['A', 'T', 'G', 'C'];
    let newSequence = '';
    for (let i = 0; i < 100; i++) {
      newSequence += bases[Math.floor(Math.random() * bases.length)];
    }
    setSequence(newSequence);
    setCurrentIndex(0);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">DNA Sequence Visualization</h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentIndex(0)}
            className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-lg"
          >
            <RotateCcw className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg"
          >
            <Settings className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Animation Speed</label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-cyan-300 text-sm">{speed}x</span>
            </div>
            
            <div>
              <label className="block text-white font-medium mb-2">Visualization Mode</label>
              <select
                value={visualizationMode}
                onChange={(e) => setVisualizationMode(e.target.value as any)}
                className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white"
              >
                <option value="both">Double Helix + Sequence</option>
                <option value="helix">Double Helix Only</option>
                <option value="sequence">Sequence Only</option>
              </select>
            </div>

            <div className="space-y-2">
              <button
                onClick={loadStoredSequence}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
              >
                Load Last Encoded
              </button>
              <button
                onClick={generateRandomSequence}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-sm flex items-center justify-center space-x-1"
              >
                <Zap className="h-4 w-4" />
                <span>Random DNA</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* DNA Sequence Input */}
      <div className="bg-white/5 rounded-lg p-4">
        <label className="block text-white font-medium mb-2">DNA Sequence</label>
        <textarea
          value={sequence}
          onChange={(e) => setSequence(e.target.value.toUpperCase())}
          placeholder="Enter DNA sequence (A, T, G, C)"
          className="w-full h-20 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono text-sm resize-none"
        />
        <p className="text-cyan-300 text-sm mt-2">
          Length: {sequence.length} bases • Position: {currentIndex + 1}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3D DNA Helix Visualization */}
        {(visualizationMode === 'helix' || visualizationMode === 'both') && (
          <div className="bg-black/30 rounded-lg p-6 min-h-96">
            <h4 className="text-white font-medium mb-4">3D Double Helix</h4>
            <div className="relative h-80 overflow-hidden">
              <svg width="100%" height="100%" className="absolute inset-0">
                {/* DNA Helix Animation */}
                {sequence.split('').map((base, index) => {
                  const angle = (index * 36) + (currentIndex * 5); // 36° per base pair
                  const y = index * 8;
                  const radius = 60;
                  const centerX = 150;
                  const centerY = 40;
                  
                  const x1 = centerX + radius * Math.cos((angle * Math.PI) / 180);
                  const z1 = radius * Math.sin((angle * Math.PI) / 180);
                  const x2 = centerX - radius * Math.cos((angle * Math.PI) / 180);
                  const z2 = -radius * Math.sin((angle * Math.PI) / 180);
                  
                  const opacity = Math.max(0.3, 1 - Math.abs(index - currentIndex) / 10);
                  const scale = 1 + (z1 / 100); // 3D perspective
                  
                  return (
                    <g key={index} opacity={opacity}>
                      {/* First strand */}
                      <motion.circle
                        cx={x1}
                        cy={centerY + y}
                        r={4 * scale}
                        fill={getBaseColor(base)}
                        animate={{
                          r: index === currentIndex ? 6 * scale : 4 * scale,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Second strand */}
                      <motion.circle
                        cx={x2}
                        cy={centerY + y}
                        r={4 * scale}
                        fill={getBaseColor(getBasePair(base))}
                        animate={{
                          r: index === currentIndex ? 6 * scale : 4 * scale,
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Connecting line */}
                      <line
                        x1={x1}
                        y1={centerY + y}
                        x2={x2}
                        y2={centerY + y}
                        stroke={index === currentIndex ? '#00f5ff' : '#ffffff40'}
                        strokeWidth={index === currentIndex ? 2 : 1}
                      />
                      
                      {/* Base labels */}
                      {index === currentIndex && (
                        <>
                          <text
                            x={x1}
                            y={centerY + y + 2}
                            textAnchor="middle"
                            className="fill-white text-xs font-bold"
                          >
                            {base}
                          </text>
                          <text
                            x={x2}
                            y={centerY + y + 2}
                            textAnchor="middle"
                            className="fill-white text-xs font-bold"
                          >
                            {getBasePair(base)}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* Sequence Visualization */}
        {(visualizationMode === 'sequence' || visualizationMode === 'both') && (
          <div className="bg-white/5 rounded-lg p-6">
            <h4 className="text-white font-medium mb-4">Linear Sequence</h4>
            <div className="space-y-4">
              {/* Base Color Legend */}
              <div className="flex flex-wrap gap-4 text-sm">
                {['A', 'T', 'G', 'C'].map((base) => (
                  <div key={base} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: getBaseColor(base) }}
                    />
                    <span className="text-white">{base}</span>
                  </div>
                ))}
              </div>

              {/* Sequence Display */}
              <div className="bg-black/50 rounded p-4 max-h-64 overflow-y-auto">
                <div className="font-mono text-sm leading-relaxed">
                  {sequence.split('').map((base, index) => (
                    <motion.span
                      key={index}
                      className={`inline-block w-6 h-6 text-center rounded margin-1 ${
                        index === currentIndex ? 'ring-2 ring-cyan-400' : ''
                      }`}
                      style={{
                        backgroundColor: getBaseColor(base),
                        color: 'white',
                        margin: '1px',
                      }}
                      animate={{
                        scale: index === currentIndex ? 1.2 : 1,
                        y: index === currentIndex ? -2 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {base}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-white/5 rounded p-3">
                <h5 className="text-white font-medium mb-2">Base Composition</h5>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {['A', 'T', 'G', 'C'].map((base) => {
                    const count = sequence.split('').filter(b => b === base).length;
                    const percentage = ((count / sequence.length) * 100).toFixed(1);
                    return (
                      <div key={base} className="text-center">
                        <div
                          className="h-2 rounded mb-1"
                          style={{ backgroundColor: getBaseColor(base) }}
                        />
                        <div className="text-white">{base}: {percentage}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Analysis */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Real-time Analysis</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">
              {sequence.length}
            </div>
            <div className="text-gray-300">Total Bases</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {((sequence.split('G').length - 1 + sequence.split('C').length - 1) / sequence.length * 100).toFixed(1)}%
            </div>
            <div className="text-gray-300">GC Content</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {Math.floor(sequence.length / 3)}
            </div>
            <div className="text-gray-300">Codons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {(sequence.length * 650).toLocaleString()}
            </div>
            <div className="text-gray-300">Daltons (MW)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNAVisualization;