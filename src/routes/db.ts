import { createClient } from "@supabase/supabase-js"
import { HandleFetch } from "@sveltejs/kit"

export class User {
    username: string = ""
    password?: string = ""
    session_id?: string
}

export class SupaUser {
    username: string = ""
    password: string = ""
    session_id: string = ""
    created_at: string = ""
    id: string = ""
}
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_SECRET);