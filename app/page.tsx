'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { text: "Hi there John! I’m your virtual concierge for Hilton Hotels. Please, do not hesitate to ask for anything.", sender: "bot" },
    { text: "Oh wow, great– can I ask for 2 extra towels to my room?", sender: "user" },
    { text: "Absolutely. 2 towels will be delivered to room 221 shortly. In the meantime, is there anything else I can get you?", sender: "bot" },
    { text: "Nope, I’m all set for now.", sender: "user" },
    { text: "Great. We’ll let you know as soon as your towels get delivered. Enjoy your stay!", sender: "bot" },
    { text: "Can we place an order for breakfast on here?", sender: "user" },
    { text: "Certainly! Do you need to see the menu or do you already know what you’d like?", sender: "bot" },
    { text: "Can we just do 2 of the egg sandwiches and one yogurt with blueberries. Oh, and a chocolate chip muffin", sender: "user" },
    { text: "Sure thing, you’ll be notified once it has been delivered to room 221", sender: "bot" },
  ]);
  const [input, setInput] = useState('');

  return (
    <div style={{
      background: '#f4f4f6',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc'
      }}>
        <span style={{ fontWeight: 'bold' }}>Envoyya</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span role="img" aria-label="notifications">🔔</span>
          <span role="img" aria-label="menu">≡</span>
        </div>
      </div>

      <div style={{
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
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
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{
        padding: '0.5rem 1rem',
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something"
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '0.75rem 1rem',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: '#d9d9d9',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
}
