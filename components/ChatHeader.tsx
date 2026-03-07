
import React from 'react';
import { BOT_STATUS, WHATSAPP_LINK, TELEGRAM_LINK, INSTAGRAM_LINK } from '../constants';
import WhatsappIcon from './icons/WhatsappIcon';
import TelegramIcon from './icons/TelegramIcon';
import InstagramIcon from './icons/InstagramIcon';

interface ChatHeaderProps {
  botName: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ botName }) => {
  return (
    <div className="bg-gray-700/50 p-4 border-b border-gray-600/50 flex justify-between items-center rounded-t-2xl">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
            AI
          </div>
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 border-2 border-gray-700"></span>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">{botName}</h1>
          <p className="text-sm text-green-400">{BOT_STATUS}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="WhatsApp"
        >
          <WhatsappIcon />
        </a>
        <a
          href={TELEGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Telegram"
        >
          <TelegramIcon />
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;
