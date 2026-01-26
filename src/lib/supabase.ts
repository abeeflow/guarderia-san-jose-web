import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qehuhabuwzdzoygcotyn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlaHVoYWJ1d3pkem95Z2NvdHluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMjk2MTIsImV4cCI6MjA4NDgwNTYxMn0.4F00Q-PRi7x6humAlAEl8me_P3EL3fBokv1jdeUIriA';

export const supabase = createClient(supabaseUrl, supabaseKey);
