import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Atomic increment in one query using Postgres SQL update
    const { data, error } = await supabase
      .from('button_clicks')
      .update({ count: supabase.raw('count + 1') })
      .select('count')
      .limit(1);

    if (error) {
      throw error;
    }

    res.status(200).json({ count: data[0].count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
