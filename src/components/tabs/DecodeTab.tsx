import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Image, Video, Music, File, Zap, CheckCircle, AlertCircle, Copy } from 'lucide-react';

const DecodeTab: React.FC = () => {
  const [dnaSequence, setDnaSequence] = useState('');
  const [decoding, setDecoding] = useState(false);
  const [decodedFile, setDecodedFile] = useState<{
    name: string;
    type: string;
    size: number;
    data: string;
    url: string;
  } | null>(null);
  const [progress, setProgress] = useState(0);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.startsWith('text/')) return FileText;
    return File;
  };

  const base4ToBinary = (dnaSequence: string): string => {
    const mapping: { [key: string]: string } = {
      'A': '00',
      'T': '01',
      'G': '10',
      'C': '11'
    };
    
    let binaryString = '';
    for (const nucleotide of dnaSequence) {
      binaryString += mapping[nucleotide.toUpperCase()] || '00';
    }
    
    return binaryString;
  };

  const binaryToFile = (binary: string, fileName: string, fileType: string) => {
    const bytes = [];
    for (let i = 0; i < binary.length; i += 8) {
      const byte = binary.substr(i, 8);
      if (byte.length === 8) {
        bytes.push(parseInt(byte, 2));
      }
    }
    
    const uint8Array = new Uint8Array(bytes);
    const blob = new Blob([uint8Array], { type: fileType });
    const url = URL.createObjectURL(blob);
    
    return { blob, url };
  };

  const validateChecksum = (sequence: string): boolean => {
    if (sequence.length < 4) return false;
    
    const dataSequence = sequence.slice(0, -4);
    const providedChecksum = sequence.slice(-4);
    
    const calculatedChecksum = dataSequence.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0) % 4;
    
    const checksumMap = ['A', 'T', 'G', 'C'];
    const expectedChecksum = checksumMap[calculatedChecksum].repeat(4);
    
    return providedChecksum === expectedChecksum;
  };

  const removeAIEnhancement = (sequence: string): string => {
    // Remove AI-added redundancy
    let cleaned = '';
    let skipNext = false;
    
    for (let i = 0; i < sequence.length; i++) {
      if (skipNext) {
        skipNext = false;
        continue;
      }
      
      // Check for doubled characters (AI enhancement)
      if (i < sequence.length - 1 && sequence[i] === sequence[i + 1]) {
        cleaned += sequence[i];
        skipNext = true;
      } else {
        cleaned += sequence[i];
      }
    }
    
    return cleaned;
  };

  const decodeSequence = async () => {
    if (!dnaSequence.trim()) return;

    setDecoding(true);
    setProgress(0);

    try {
      let cleanSequence = dnaSequence.trim().toUpperCase();
      setProgress(10);

      // Validate checksum
      if (!validateChecksum(cleanSequence)) {
        throw new Error('Invalid DNA sequence: checksum mismatch');
      }
      setProgress(20);

      // Remove checksum
      const dataSequence = cleanSequence.slice(0, -4);
      setProgress(30);

      // Remove AI enhancements
      const originalSequence = removeAIEnhancement(dataSequence);
      setProgress(50);

      // Convert DNA to binary
      const binaryData = base4ToBinary(originalSequence);
      setProgress(70);

      // Try to determine file type from stored sequences
      const storedSequences = JSON.parse(localStorage.getItem('dna_sequences') || '[]');
      const matchedSequence = storedSequences.find((seq: any) => 
        seq.sequence === cleanSequence || seq.sequence.startsWith(cleanSequence.substr(0, 100))
      );

      let fileName = 'decoded_file';
      let fileType = 'application/octet-stream';

      if (matchedSequence) {
        fileName = matchedSequence.originalFileName;
        fileType = matchedSequence.fileType;
      } else {
        // Try to guess file type from binary header
        const header = binaryData.substr(0, 32);
        if (header.startsWith('11111111110110001001111111101000')) {
          fileType = 'image/jpeg';
          fileName = 'decoded_image.jpg';
        } else if (header.includes('1010000100100000')) {
          fileType = 'text/plain';
          fileName = 'decoded_text.txt';
        }
      }

      setProgress(90);

      // Convert binary to file
      const { blob, url } = binaryToFile(binaryData, fileName, fileType);
      
      // If it's text, also get the text content
      let textContent = '';
      if (fileType.startsWith('text/')) {
        textContent = await blob.text();
      }

      setDecodedFile({
        name: fileName,
        type: fileType,
        size: blob.size,
        data: textContent,
        url: url
      });

      setProgress(100);

    } catch (error) {
      console.error('Decoding error:', error);
      alert('Failed to decode DNA sequence. Please check the sequence format.');
    }

    setTimeout(() => {
      setDecoding(false);
      setProgress(0);
    }, 500);
  };

  const downloadFile = () => {
    if (!decodedFile) return;

    const a = document.createElement('a');
    a.href = decodedFile.url;
    a.download = decodedFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const loadStoredSequence = (sequence: any) => {
    setDnaSequence(sequence.sequence);
    setDecodedFile(null);
  };

  const storedSequences = JSON.parse(localStorage.getItem('dna_sequences') || '[]');

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">DNA Sequence Decoding</h3>
          
          <div className="space-y-4">
            <label className="block text-white font-medium">
              Enter DNA Sequence
            </label>
            <textarea
              value={dnaSequence}
              onChange={(e) => setDnaSequence(e.target.value)}
              placeholder="Paste your DNA sequence here (ATGCATGC...)"
              className="w-full h-32 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono text-sm resize-none"
            />
            <p className="text-cyan-300 text-sm">
              Sequence length: {dnaSequence.length.toLocaleString()} bases
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={decodeSequence}
            disabled={!dnaSequence.trim() || decoding}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {decoding ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Decoding... {progress}%</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                <span>Decode DNA</span>
              </>
            )}
          </motion.button>

          {/* Stored Sequences */}
          {storedSequences.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">Previously Encoded Files</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {storedSequences.map((seq: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white/5 rounded p-2"
                  >
                    <div className="flex items-center space-x-2">
                      {React.createElement(getFileIcon(seq.fileType), {
                        className: "h-4 w-4 text-cyan-400"
                      })}
                      <span className="text-white text-sm">{seq.originalFileName}</span>
                    </div>
                    <button
                      onClick={() => loadStoredSequence(seq)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white">Decoding Results</h3>
          
          {decodedFile ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white font-medium">Decoding Successful</span>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  {React.createElement(getFileIcon(decodedFile.type), {
                    className: "h-8 w-8 text-cyan-400"
                  })}
                  <div className="flex-1">
                    <p className="text-white font-medium">{decodedFile.name}</p>
                    <p className="text-green-300 text-sm">
                      {(decodedFile.size / 1024).toFixed(2)} KB • {decodedFile.type}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={downloadFile}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download File</span>
                </motion.button>
              </div>

              {/* Preview for text files */}
              {decodedFile.type.startsWith('text/') && decodedFile.data && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">File Preview</h4>
                    <button
                      onClick={() => navigator.clipboard.writeText(decodedFile.data)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center space-x-1"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="bg-black/30 rounded p-3 max-h-40 overflow-y-auto">
                    <pre className="text-cyan-300 text-xs whitespace-pre-wrap">
                      {decodedFile.data}
                    </pre>
                  </div>
                </div>
              )}

              {/* Preview for images */}
              {decodedFile.type.startsWith('image/') && (
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Image Preview</h4>
                  <img
                    src={decodedFile.url}
                    alt="Decoded"
                    className="max-w-full h-auto rounded border border-white/20"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              )}
            </motion.div>
          ) : (
            <div className="bg-white/5 rounded-lg p-8 text-center">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">
                Enter a DNA sequence and click "Decode DNA" to recover your file
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecodeTab;