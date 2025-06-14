import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image, Video, Music, File, Zap, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { DNASequence } from '../../types';

const EncodeTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [encoding, setEncoding] = useState(false);
  const [encodedSequence, setEncodedSequence] = useState<DNASequence | null>(null);
  const [storageLevel, setStorageLevel] = useState(5);
  const [progress, setProgress] = useState(0);
  const [encodingStage, setEncodingStage] = useState('');

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.startsWith('text/')) return FileText;
    return File;
  };

  // Optimized binary to DNA conversion
  const binaryToBase4 = (binary: string): string => {
    const mapping = ['A', 'T', 'G', 'C']; // Direct array access is faster
    let result = '';
    
    // Pad binary to even length
    if (binary.length % 2 !== 0) binary = '0' + binary;
    
    // Process in chunks for better performance
    const chunkSize = 1000;
    for (let i = 0; i < binary.length; i += chunkSize) {
      const chunk = binary.substr(i, chunkSize);
      let chunkResult = '';
      
      for (let j = 0; j < chunk.length; j += 2) {
        const pair = chunk.substr(j, 2);
        const index = parseInt(pair, 2);
        chunkResult += mapping[index];
      }
      
      result += chunkResult;
    }
    
    return result;
  };

  const addErrorCorrection = (sequence: string): string => {
    // Simplified checksum for speed
    const checksum = sequence.length % 4;
    const checksumMap = ['A', 'T', 'G', 'C'];
    return sequence + checksumMap[checksum].repeat(4);
  };

  const simulateAIEncoding = (data: string, level: number): string => {
    // Optimized AI enhancement - less computation for speed
    if (level <= 3) return data; // Skip enhancement for low levels
    
    let encoded = '';
    const enhancementRate = Math.min(level / 10, 0.3); // Cap enhancement
    
    for (let i = 0; i < data.length; i++) {
      encoded += data[i];
      
      // Add redundancy based on level and position
      if (level > 7 && i % Math.floor(100 / level) === 0) {
        encoded += data[i]; // Simple doubling for critical positions
      }
    }
    
    return encoded;
  };

  const encodeFile = useCallback(async () => {
    if (!file) return;

    setEncoding(true);
    setProgress(0);
    setEncodingStage('Reading file...');

    try {
      // Read file as binary with progress tracking
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      setProgress(15);
      setEncodingStage('Converting to binary...');

      // Optimized binary conversion
      let binaryString = '';
      const chunkSize = 1024; // Process in chunks
      
      for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.slice(i, i + chunkSize);
        let chunkBinary = '';
        
        for (let j = 0; j < chunk.length; j++) {
          chunkBinary += chunk[j].toString(2).padStart(8, '0');
        }
        
        binaryString += chunkBinary;
        setProgress(15 + (i / uint8Array.length) * 25);
        
        // Allow UI to update
        if (i % (chunkSize * 10) === 0) {
          await new Promise(resolve => setTimeout(resolve, 1));
        }
      }

      setProgress(45);
      setEncodingStage('Converting to DNA sequence...');
      
      // Convert binary to DNA sequence
      let dnaSequence = binaryToBase4(binaryString);
      setProgress(65);
      
      setEncodingStage('Applying AI enhancement...');
      // Apply AI enhancement
      dnaSequence = simulateAIEncoding(dnaSequence, storageLevel);
      setProgress(80);
      
      setEncodingStage('Adding error correction...');
      // Add error correction
      const finalSequence = addErrorCorrection(dnaSequence);
      setProgress(90);

      setEncodingStage('Finalizing...');
      // Create DNA sequence object
      const encodedData: DNASequence = {
        id: Date.now().toString(),
        sequence: finalSequence,
        originalFileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        encodingTime: Date.now() - parseInt(Date.now().toString()), // Will be calculated properly
        compressionRatio: file.size / finalSequence.length,
        checksum: finalSequence.slice(-4),
        timestamp: new Date().toISOString(),
        transactionId: `0.0.${Math.floor(Math.random() * 999999)}@${Date.now()}`,
        nftId: `NFT-${Math.random().toString(36).substr(2, 9)}`
      };

      setProgress(100);
      setEncodedSequence(encodedData);
      
      // Store in localStorage for persistence
      const stored = JSON.parse(localStorage.getItem('dna_sequences') || '[]');
      stored.push(encodedData);
      localStorage.setItem('dna_sequences', JSON.stringify(stored));

    } catch (error) {
      console.error('Encoding error:', error);
      setEncodingStage('Error occurred during encoding');
    }

    setTimeout(() => {
      setEncoding(false);
      setProgress(0);
      setEncodingStage('');
    }, 1000);
  }, [file, storageLevel]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setEncodedSequence(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">File Upload & Encoding</h3>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="border-2 border-dashed border-cyan-400/50 rounded-lg p-8 text-center hover:border-cyan-400 transition-colors"
          >
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="*/*"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-white mb-2">Click to upload your file</p>
              <p className="text-cyan-300 text-sm">
                Supports all file types • Optimized for fast processing
              </p>
            </label>
          </motion.div>

          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                {React.createElement(getFileIcon(file.type), {
                  className: "h-8 w-8 text-cyan-400"
                })}
                <div className="flex-1">
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-cyan-300 text-sm">
                    {(file.size / 1024).toFixed(2)} KB • {file.type || 'Unknown type'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Storage Level */}
          <div className="space-y-3">
            <label className="block text-white font-medium">
              Storage Optimization Level: {storageLevel}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={storageLevel}
              onChange={(e) => setStorageLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-cyan-300">
              <span>Fast Processing</span>
              <span>Maximum Storage Efficiency</span>
            </div>
            <div className="text-xs text-gray-400">
              {storageLevel <= 3 && "Basic compression, fastest encoding"}
              {storageLevel > 3 && storageLevel <= 7 && "Balanced compression and speed"}
              {storageLevel > 7 && "Maximum compression, slower encoding"}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={encodeFile}
            disabled={!file || encoding}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {encoding ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Encoding... {progress}%</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                <span>Encode to DNA</span>
              </>
            )}
          </motion.button>

          {/* Progress Details */}
          {encoding && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span className="text-white text-sm">{encodingStage}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Encoding Results</h3>
          
          {encodedSequence ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Encoding Successful</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-green-300">File Name</p>
                    <p className="text-white">{encodedSequence.originalFileName}</p>
                  </div>
                  <div>
                    <p className="text-green-300">File Size</p>
                    <p className="text-white">{(encodedSequence.fileSize / 1024).toFixed(2)} KB</p>
                  </div>
                  <div>
                    <p className="text-green-300">DNA Length</p>
                    <p className="text-white">{encodedSequence.sequence.length.toLocaleString()} bases</p>
                  </div>
                  <div>
                    <p className="text-green-300">Compression</p>
                    <p className="text-white">{encodedSequence.compressionRatio.toFixed(2)}:1</p>
                  </div>
                  <div>
                    <p className="text-green-300">Transaction ID</p>
                    <p className="text-white font-mono text-xs">{encodedSequence.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-green-300">NFT ID</p>
                    <p className="text-white font-mono text-xs">{encodedSequence.nftId}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">DNA Sequence (Complete)</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(encodedSequence.sequence)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm bg-cyan-500/20 px-3 py-1 rounded"
                  >
                    Copy DNA
                  </motion.button>
                </div>
                <div className="bg-black/30 rounded p-3 max-h-40 overflow-y-auto">
                  <p className="text-cyan-300 font-mono text-xs break-all leading-relaxed">
                    {encodedSequence.sequence}
                  </p>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  This complete DNA sequence can be used for decoding or synthesis
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-cyan-400">
                    {((encodedSequence.sequence.match(/A/g) || []).length / encodedSequence.sequence.length * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Adenine (A)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-400">
                    {((encodedSequence.sequence.match(/G/g) || []).length / encodedSequence.sequence.length * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">Guanine (G)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-400">
                    {(((encodedSequence.sequence.match(/G/g) || []).length + (encodedSequence.sequence.match(/C/g) || []).length) / encodedSequence.sequence.length * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400">GC Content</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/5 rounded-lg p-8 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                Upload a file and click "Encode to DNA" to see results here
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Optimized for fast processing and real-time feedback
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncodeTab;