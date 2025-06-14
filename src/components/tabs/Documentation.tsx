import React, { useState } from 'react';
import { Book, Code, Dna, Zap, Shield, Globe } from 'lucide-react';

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Book },
    { id: 'encoding', title: 'DNA Encoding', icon: Dna },
    { id: 'blockchain', title: 'Hedera Integration', icon: Zap },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'api', title: 'API Reference', icon: Code },
    { id: 'network', title: 'Lab Network', icon: Globe },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">BioNFT Platform Overview</h2>
            
            <div className="prose max-w-none">
              <p className="text-lg text-gray-300 mb-6">
                BioNFT is a revolutionary platform that combines biotechnology, artificial intelligence, 
                and blockchain technology to create a new paradigm for data storage and preservation.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-500/20 p-6 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-200 mb-3">1. File Upload & Analysis</h4>
                  <p className="text-blue-100">
                    Upload any digital file (images, documents, videos) and our AI analyzes 
                    the binary data for optimal encoding patterns.
                  </p>
                </div>
                
                <div className="bg-green-500/20 p-6 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-200 mb-3">2. DNA Conversion</h4>
                  <p className="text-green-100">
                    Advanced algorithms convert binary data into unique DNA sequences using 
                    the four nucleotide bases: A, T, G, and C.
                  </p>
                </div>
                
                <div className="bg-purple-500/20 p-6 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-200 mb-3">3. Blockchain Storage</h4>
                  <p className="text-purple-100">
                    DNA sequences are minted as NFTs on the Hedera Hashgraph network, 
                    ensuring immutable and secure storage.
                  </p>
                </div>
                
                <div className="bg-orange-500/20 p-6 rounded-lg border border-orange-500/30">
                  <h4 className="font-semibold text-orange-200 mb-3">4. Physical Synthesis</h4>
                  <p className="text-orange-100">
                    Partner laboratories can synthesize the DNA sequences into physical 
                    molecules for long-term archival storage.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Ultra-long-term storage (thousands of years)</li>
                <li>Extreme data density (1 exabyte per cubic millimeter)</li>
                <li>Immutable blockchain verification</li>
                <li>Global laboratory network access</li>
                <li>Decentralized governance through DNAS tokens</li>
              </ul>
            </div>
          </div>
        );

      case 'encoding':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">DNA Encoding Process</h2>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Binary to DNA Mapping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Base Encoding</h4>
                  <div className="bg-black/30 p-4 rounded-lg font-mono text-sm">
                    <div className="space-y-1 text-gray-300">
                      <div>00 → A (Adenine)</div>
                      <div>01 → T (Thymine)</div>
                      <div>10 → G (Guanine)</div>
                      <div>11 → C (Cytosine)</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-white mb-3">Example Conversion</h4>
                  <div className="bg-black/30 p-4 rounded-lg font-mono text-sm">
                    <div className="space-y-2 text-gray-300">
                      <div><strong className="text-cyan-400">Binary:</strong> 01001000</div>
                      <div><strong className="text-cyan-400">Pairs:</strong> 01|00|10|00</div>
                      <div><strong className="text-cyan-400">DNA:</strong> TAGA</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Enhancement</h3>
              <p className="text-gray-300 mb-4">
                Our AI system optimizes the encoding process with several advanced features:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Position-based encoding variations for better data integrity</li>
                <li>Adaptive redundancy based on optimization level</li>
                <li>Error correction through Reed-Solomon-like algorithms</li>
                <li>Checksum validation for data verification</li>
              </ul>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Storage Optimization Levels</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span className="font-medium text-white">Level 1-3 (Standard)</span>
                  <span className="text-sm text-gray-300">Basic compression, fast processing</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span className="font-medium text-white">Level 4-7 (Balanced)</span>
                  <span className="text-sm text-gray-300">Enhanced storage, moderate processing</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <span className="font-medium text-white">Level 8-10 (Maximum)</span>
                  <span className="text-sm text-gray-300">Optimal storage, intensive processing</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'blockchain':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Hedera Hashgraph Integration</h2>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Why Hedera?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400 mb-2">10,000+</div>
                  <div className="text-sm text-blue-200">Transactions per second</div>
                </div>
                <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400 mb-2">3-5s</div>
                  <div className="text-sm text-green-200">Consensus time</div>
                </div>
                <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-400 mb-2">$0.0001</div>
                  <div className="text-sm text-purple-200">Average transaction fee</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">NFT Structure</h3>
              <div className="bg-black/30 p-4 rounded-lg">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "tokenId": "0.0.123456",
  "serialNumber": 1,
  "metadata": {
    "name": "DNA Sequence #1",
    "description": "Encoded file: document.pdf",
    "dnaSequence": "ATGCATGC...",
    "originalFileName": "document.pdf",
    "fileSize": 2048,
    "encodingTimestamp": "2024-01-15T10:30:00Z",
    "compressionRatio": 2.5,
    "checksum": "ATGC"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Security & Privacy</h2>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Data Protection</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">End-to-End Encryption</h4>
                    <p className="text-gray-300">All files are processed securely before DNA conversion.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Blockchain Immutability</h4>
                    <p className="text-gray-300">DNA sequences stored on Hedera cannot be altered or deleted.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-purple-400 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Access Control</h4>
                    <p className="text-gray-300">Secure authentication and authorization systems.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">API Reference</h2>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Encoding Process</h3>
              <div className="bg-black/30 p-4 rounded-lg">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// File to DNA encoding
const encodeToDNA = async (file, optimizationLevel = 5) => {
  const binaryData = await fileToBinary(file);
  const dnaSequence = binaryToDNA(binaryData);
  const enhanced = applyAIEnhancement(dnaSequence, optimizationLevel);
  const withChecksum = addErrorCorrection(enhanced);
  return withChecksum;
};`}
                </pre>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Decoding Process</h3>
              <div className="bg-black/30 p-4 rounded-lg">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`// DNA to file decoding
const decodeFromDNA = async (dnaSequence) => {
  const validated = validateChecksum(dnaSequence);
  const cleaned = removeAIEnhancement(validated);
  const binaryData = dnaToBinary(cleaned);
  const file = binaryToFile(binaryData);
  return file;
};`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Laboratory Network</h2>
            
            <div className="bg-white/10 border border-white/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Global Partners</h3>
              <p className="text-gray-300 mb-4">
                Our network consists of certified laboratories worldwide, providing DNA synthesis and storage services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-white/10 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Quality Standards</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• ISO certification required</li>
                    <li>• 99.9% synthesis accuracy</li>
                    <li>• Full traceability</li>
                    <li>• 24/7 monitoring</li>
                  </ul>
                </div>
                
                <div className="p-4 border border-white/10 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Service Levels</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Standard: 7-14 days</li>
                    <li>• Express: 3-5 days</li>
                    <li>• Priority: 24-48 hours</li>
                    <li>• Custom solutions available</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/20 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">Documentation</h2>
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Documentation;