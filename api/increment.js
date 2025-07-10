// /api/counter.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const COUNTER_ID = 'eye-clicks';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Increment the counter via RPC or manual update
    const { data, error } = await supabase.rpc('increment_counter', {
      row_id: COUNTER_ID,
    });

    if (error) return res.status(500).json({ error });
    return res.status(200).json(data);
  }

  // GET request: fetch current count
  const { data, error } = await supabase
    .from('counters')
    .select('count')
    .eq('id', COUNTER_ID)
    .single();

  if (error) return res.status(500).json({ error });
  return res.status(200).json(data);
}
