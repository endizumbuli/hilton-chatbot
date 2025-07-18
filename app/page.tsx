'use client';

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // ensures SSR

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function HomePage() {
  const { data, error } = await supabase
    .from('guest_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to the Hilton Chatbot</h1>
        <p className="text-blue-600 underline">
          <Link href="/admin">Go to Admin Panel</Link>
        </p>
      </div>

      {/* Guest Requests */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Guest Requests</h2>
        {error ? (
          <p className="text-red-500">Error loading requests.</p>
        ) : data && data.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          <ul className="space-y-4">
            {data?.map((req, index) => (
              <li key={index} className="p-4 border rounded bg-white shadow">
                <p><strong>Room #:</strong> {req.room_number}</p>
                <p><strong>Type:</strong> {req.type}</p>
                <p><strong>Hotel ID:</strong> {req.hotel_id}</p>
                <p><strong>Created At:</strong> {new Date(req.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
