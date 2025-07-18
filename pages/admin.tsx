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
      error: error || null,
    },
  };
}

export default function AdminPage({ requests, error }: any) {
  return (
    <div>
      <h1>Guest Requests</h1>
      {error && <p>Error loading requests</p>}
      <ul>
        {requests.map((req: any, index: number) => (
          <li key={index}>
            <p><strong>Room #:</strong> {req.room_number}</p>
            <p><strong>Type:</strong> {req.type}</p>
            <p><strong>Hotel ID:</strong> {req.hotel_id}</p>
            <p><strong>Created At:</strong> {new Date(req.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
