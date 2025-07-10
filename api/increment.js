// pages/api/increment.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // PRIVATE key
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { row_id } = req.body;

  const { data, error } = await supabase.rpc('increment_counter', { row_id });

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json(data);
}
