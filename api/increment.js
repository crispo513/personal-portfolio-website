// /api/increment.js

import { createClient } from '@supabase/supabase-js';

// Environment variables from Vercel dashboard
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// Counter row ID
const COUNTER_ID = 'eye-clicks';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data, error } = await supabase.rpc('increment_counter', {
      row_id: COUNTER_ID
    });

    if (error) {
      console.error('Supabase RPC error (POST):', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ count: data.count });
  }

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('counters')
      .select('count')
      .eq('id', COUNTER_ID)
      .single();

    if (error) {
      console.error('Supabase error (GET):', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ count: data.count });
  }

  // Unsupported HTTP method
  return res.status(405).json({ error: 'Method not allowed' });
}
