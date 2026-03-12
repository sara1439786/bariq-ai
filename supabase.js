import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://ennjdytlptaywokkzvnm.supabase.co"
const supabaseKey = sb_publishable_npll8QpLghinRC6gMO4_wA_ZgM-ogRd 

export const supabase = createClient(supabaseUrl, supabaseKey)
