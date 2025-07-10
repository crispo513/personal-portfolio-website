// /api/increment.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

const COUNTER_ID = 'eye-clicks';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data, error } = await supabase.rpc('increment_counter', {
      row_id: COUNTER_ID
    });

    if (error) {
      console.error('Supabase RPC error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ count: data.count });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
