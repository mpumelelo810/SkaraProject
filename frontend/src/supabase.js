import { createClient } from '@supabase/supabase-js'

// Publishable credentials are safe in browsers; row policies protect the data.
const url = import.meta.env.VITE_SUPABASE_URL || 'https://zqxnxflsbcfacdskfbfz.supabase.co'
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_pS3fSv9ks8KU9K-QrgW9dA_kvQlGRVY'
export const supabase = createClient(url, key)
