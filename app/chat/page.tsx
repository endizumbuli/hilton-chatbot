'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, newUserMessage]);

    setTimeout(() => {
      const botReply: Message = {
        sender: 'bot',
        text: 'Thanks! We’ve received your request and will follow up shortly.',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <Image src="/envoyya-logo.png" alt="Envoyya Logo" width={28} height={28} />
          <h1 className="text-lg font-semibold">Envoyya</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] px-4 py-2 rounded-xl text-white ${
              msg.sender === 'user'
                ? 'bg-blue-400 self-end text-white ml-auto'
                : 'bg-black self-start text-white mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask something"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-black text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
