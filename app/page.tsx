'use client';
import { useState, useRef, useEffect } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};
<div
  style={{
    position: "sticky",
    top: 0,
    zIndex: 10,
    background: "#1f1bff",
    color: "white",
    padding: "14px 16px",
    borderRadius: 12,
    margin: "16px 16px 8px 16px",
    textAlign: "center",
    fontWeight: 700,
  }}
>
  Chat Concierge
</div>

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
        }),
      });

      const data = await res.json();
      const botMessage: Message = {
        sender: 'bot',
        text: data.reply || 'Sorry, I didn’t understand that.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      style={{
        background: '#f4f4f6',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ccc',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>Envoyya</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>🔔</span>
          <span>≡</span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#3396ff' : '#000',
              color: 'white',
              padding: '0.75rem 1rem',
              borderRadius: '20px',
              maxWidth: '75%',
              fontSize: '14px',
              lineHeight: '1.4',
              borderBottomRightRadius: msg.sender === 'user' ? '4px' : '20px',
              borderBottomLeftRadius: msg.sender === 'user' ? '20px' : '4px',
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div
        style={{
          padding: '0.5rem 1rem',
          borderTop: '1px solid #ccc',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Ask something"
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.75rem 1rem',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: '#d9d9d9',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}
