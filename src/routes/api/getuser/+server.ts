import type { RequestHandler } from "@sveltejs/kit";
import { supabase, SupaUser, User } from "../../db.ts";

export const GET: RequestHandler = async (params) => {
    const session_id = params.cookies.get('session')

    const {data} = await supabase.from('users').select('*').match({session_id: session_id})
    if(JSON.stringify(data) == '[]') {
        return new Response("err", {status: 305})
    }

    const userdata: SupaUser = data![0]
    const user: User = {username: userdata.username, session_id: userdata.session_id}

    return new Response(JSON.stringify(user), {status: 200})
}