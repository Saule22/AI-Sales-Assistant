
import React, { useState } from 'react';
import MicIcon from './icons/MicIcon';
import SendIcon from './icons/SendIcon';
import StopIcon from './icons/StopIcon';
import GridIcon from './icons/GridIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onShowCatalog: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isRecording, onStartRecording, onStopRecording, onShowCatalog }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  }

  return (
    <div className="bg-gray-700/50 p-4 border-t border-gray-600/50 rounded-b-2xl">
      <div className="flex items-center bg-gray-900/50 rounded-full px-2 py-2 sm:px-3">
        <button
          onClick={onShowCatalog}
          disabled={isLoading}
          className="p-2 rounded-full transition-colors duration-200 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          aria-label="Курстарды көрсету"
        >
          <GridIcon />
        </button>
        {isRecording ? (
          <div className="flex items-center w-full px-2">
            <div className="flex items-center text-red-500">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Жазылуда...
            </div>
            <div className="flex-grow text-center text-gray-400">
              Микрофонға сөйлеңіз
            </div>
          </div>
        ) : (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Хабарламаңызды енгізіңіз..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none disabled:opacity-50 mx-2"
            disabled={isLoading}
          />
        )}
        <button
          onClick={text.trim() && !isRecording ? handleSend : handleRecordToggle}
          disabled={isLoading && !isRecording}
          className="ml-2 p-2 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          aria-label={isRecording ? "Stop recording" : (text.trim() ? "Send message" : "Start recording")}
        >
          {isRecording ? (
            <div className="bg-red-500 hover:bg-red-600 p-2 rounded-full">
              <StopIcon />
            </div>
          ) : text.trim() ? (
            <div className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full">
              <SendIcon />
            </div>
          ) : (
            <div className="bg-gray-600 hover:bg-gray-500 p-2 rounded-full">
              <MicIcon />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
