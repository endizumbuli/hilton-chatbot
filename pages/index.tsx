import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Hilton Chatbot</h1>
      <p>
        <Link href="/admin">Go to Admin Panel</Link>
      </p>
    </div>
  );
}
