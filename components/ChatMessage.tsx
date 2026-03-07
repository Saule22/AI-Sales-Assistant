
import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const linkify = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline font-medium"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isBot = message.role === Role.BOT;

  const containerClasses = `flex items-end ${isBot ? 'justify-start' : 'justify-end'}`;
  const bubbleClasses = `px-4 py-3 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg break-words ${
    isBot 
      ? 'bg-gray-700 text-white rounded-bl-none' 
      : 'bg-blue-600 text-white rounded-br-none'
  }`;

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1.5">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
    </div>
  );

  return (
    <div className={containerClasses}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex-shrink-0 mr-3 flex items-center justify-center text-white text-xs font-bold">
          AI
        </div>
      )}
      <div className={bubbleClasses} style={{ whiteSpace: 'pre-wrap' }}>
        {isLoading ? <TypingIndicator /> : linkify(message.content)}
      </div>
    </div>
  );
};

export default ChatMessage;
