import type {Handle, GetSession }  from '@sveltejs/kit'
import { supabase, SupaUser } from './routes/db';
function redirect(location: string, body?: string) {
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}


export const handle: Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session')
    console.log("session: ", session)


    const {data} = await supabase.from('users').select('*').match({session_id: session})
    
    if(JSON.stringify(data) != '[]') {
        
        const user: SupaUser = data![0]
        console.log('user')
        event.locals.user = {
            username: user.username,
            created_at: user.created_at
        } 
    } else {

    }

    return resolve(event)
}