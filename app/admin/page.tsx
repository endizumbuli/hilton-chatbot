'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function AdminPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      const { data, error } = await supabase
        .from('guest_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('❌ Error fetching requests:', error);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    }

    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recent Guest Requests</h1>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req, index) => (
            <li key={index} className="p-4 border rounded">
              <p><strong>Room:</strong> {req.room_number}</p>
              <p><strong>Type:</strong> {req.type}</p>
              <p><strong>Hotel ID:</strong> {req.hotel_id}</p>
              <p><strong>Created At:</strong> {new Date(req.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
