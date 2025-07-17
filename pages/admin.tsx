import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('guest_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return {
    props: {
      requests: data || [],
      error: error?.message || null,
    },
  };
}

export default function AdminPage({ requests, error }: any) {
  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recent Guest Requests</h1>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req: any, index: number) => (
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
