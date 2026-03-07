
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, Role, Product } from './types';
import { getBotResponse } from './services/geminiService';
import { BOT_NAME, INITIAL_MESSAGE, PAYMENT_KEYWORDS, PAYMENT_CONFIRMATION_MESSAGE, PRODUCTS } from './constants';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ActionFooter from './components/ActionFooter';
import Catalog from './components/catalog/Catalog';
import PaymentConfirmationModal from './components/PaymentConfirmationModal';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for payment flow
  const [productToConfirm, setProductToConfirm] = useState<Product | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Initialize Telegram Web App
    if ((window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand(); // Expand to full height
      
      // Optional: Set header color to match app theme
      tg.setHeaderColor('#1f2937'); // gray-800
      tg.setBackgroundColor('#111827'); // gray-900
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: Role.USER, content: text };
    setMessages((prev) => {
        const updatedMessages = prev.map(msg => ({ ...msg, catalog: false }));
        return [...updatedMessages, userMessage];
    });

    const userTextLower = text.toLowerCase();
    const isPaymentConfirmation = PAYMENT_KEYWORDS.some(keyword => userTextLower.includes(keyword));

    if (isPaymentConfirmation) {
        setIsLoading(true);
        setTimeout(() => {
            const botMessage: Message = { role: Role.BOT, content: PAYMENT_CONFIRMATION_MESSAGE };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
            setProductToConfirm(null);
        }, 1200);
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const botResponse = await getBotResponse(text, messages);
      const botMessage: Message = { role: Role.BOT, content: botResponse };
      
      let productFoundForThisTurn: Product | null = null;
      for (const product of PRODUCTS) {
        if (botResponse.includes(product.paymentLink) || (product.installmentLink && botResponse.includes(product.installmentLink))) {
          productFoundForThisTurn = product;
          break;
        }
      }
      setProductToConfirm(productFoundForThisTurn);

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Қате: ${errorMessage}`);
      const errorBotMessage: Message = { role: Role.BOT, content: `Кешіріңіз, қате пайда болды. Қайталап көріңіз. (${errorMessage})` };
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleShowCatalog = useCallback(() => {
    if (isLoading) return;
    setMessages((prev) => {
      const updatedMessages = prev.map(msg => ({ ...msg, catalog: false }));
      return [
        ...updatedMessages,
        {
          role: Role.BOT,
          content: "Міне, біздің барлық курстар мен қызметтер:",
          catalog: true,
        },
      ];
    });
  }, [isLoading]);


  const handleStartRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const simulatedTranscription = "Сәлеметсіз бе, курстарыңыз туралы толығырақ айтып беріңізші.";
        handleSendMessage(simulatedTranscription);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Микрофонға қол жеткізу мүмкін болмады. Рұқсаттарды тексеріңіз.");
    }
  }, [handleSendMessage]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);
  
  const handleInitiatePurchase = () => {
    if (productToConfirm) {
      setIsConfirmationModalOpen(true);
    }
  };

  const handleConfirmPayment = (paymentUrl: string) => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
      const confirmationBotMessage: Message = {
        role: Role.BOT,
        content: "Тамаша! Төлемді аяқтау үшін сіз төлем бетіне бағытталдыңыз. Төлем жасап болған соң, осы жерге 'төледім' деп жазып, растаңыз."
      };
      setMessages(prev => [...prev, confirmationBotMessage]);
    }
    setIsConfirmationModalOpen(false);
    setProductToConfirm(null); 
  };

  const handleCancelPayment = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 p-2 sm:p-4">
      <div className="flex flex-col w-full max-w-2xl h-full sm:h-[95vh] max-h-[800px] bg-gray-800 shadow-2xl rounded-2xl border border-gray-700">
        <ChatHeader botName={BOT_NAME} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => (
             <React.Fragment key={index}>
                <ChatMessage message={msg} />
                {msg.catalog && (
                  <Catalog
                    products={PRODUCTS}
                    onSelectCourse={(courseName) => handleSendMessage(`"${courseName}" курсы туралы толығырақ айтып беріңізші.`)}
                  />
                )}
              </React.Fragment>
          ))}
          {isLoading && <ChatMessage message={{ role: Role.BOT, content: '...' }} isLoading={true} />}
          {error && <div className="text-red-400 text-center text-sm py-2">{error}</div>}
          <div ref={chatEndRef} />
        </div>
        <ActionFooter isEnabled={!!productToConfirm} onInitiatePurchase={handleInitiatePurchase} />
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
          onShowCatalog={handleShowCatalog}
        />
      </div>
       <PaymentConfirmationModal
        isOpen={isConfirmationModalOpen}
        product={productToConfirm}
        onConfirm={handleConfirmPayment}
        onCancel={handleCancelPayment}
      />
    </div>
  );
};

export default App;
