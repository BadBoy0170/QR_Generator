import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Download, Share2, Printer, Camera, Settings2 } from 'lucide-react';
import { QRConfig, QRType } from '../types/qr';
import { downloadQR, printQR, shareQR } from '../utils/qr-actions';

const QRCodeGenerator: React.FC = () => {
  const [config, setConfig] = useState<QRConfig>({
    type: 'url',
    content: '',
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'M',
    includeMargin: true,
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfig({ ...config, content: e.target.value });
  };

  const handleTypeChange = (type: QRType) => {
    setConfig({ ...config, type, content: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Advanced QR Code Generator</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input and Controls */}
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">QR Code Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['url', 'text', 'email', 'contact', 'event', 'sms', 'wifi'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type as QRType)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${config.type === type
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <input
                  type="text"
                  value={config.content}
                  onChange={handleContentChange}
                  placeholder={`Enter ${config.type}...`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Customization</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Size</label>
                    <input
                      type="range"
                      min="128"
                      max="512"
                      value={config.size}
                      onChange={(e) => setConfig({ ...config, size: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Error Correction</label>
                    <select
                      value={config.level}
                      onChange={(e) => setConfig({ ...config, level: e.target.value as 'L' | 'M' | 'Q' | 'H' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="L">Low</option>
                      <option value="M">Medium</option>
                      <option value="Q">High</option>
                      <option value="H">Very High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Foreground Color</label>
                    <input
                      type="color"
                      value={config.fgColor}
                      onChange={(e) => setConfig({ ...config, fgColor: e.target.value })}
                      className="w-full h-10 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Background Color</label>
                    <input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) => setConfig({ ...config, bgColor: e.target.value })}
                      className="w-full h-10 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview and Actions */}
            <div className="flex flex-col items-center space-y-6">
              <div id="qr-code" className="bg-white p-8 rounded-xl shadow-lg">
                <QRCode
                  value={config.content || 'https://example.com'}
                  size={config.size}
                  fgColor={config.fgColor}
                  bgColor={config.bgColor}
                  level={config.level}
                  includeMargin={config.includeMargin}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => downloadQR('qr-code')}
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={() => printQR('qr-code')}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button 
                  onClick={() => shareQR('qr-code')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;