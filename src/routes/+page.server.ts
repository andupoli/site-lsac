import type { Actions, PageServerLoad } from "./$types";
import { invalid, json, redirect } from '@sveltejs/kit';
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { supabase } from "./db";
import type { User, SupaUser } from "./db";
export const customResponse = (status: number, success: boolean, message: string, data?: any) => {
    if (success) {
        return {
            success: success,
            message: message,
            info: data
        };
    }
    return invalid(status, {
        success: success,
        message: message,
        info: data
    });
};

import { dev } from "$app/environment";
import { v4 as uuidv4 } from 'uuid';

export const actions: Actions = {
    login: async({request, cookies}: any) => {
        const form = await request.formData()
        const username = form.get('username')
        const password = form.get('password')
        const user: User = {username: username, password: password, session_id: uuidv4()}

        // Find (user)

        const { data } = await supabase.from('users').select('*').match({username: user.username})
        if (JSON.stringify(data) == '[]') {
            return;
        }
        const matchedUser: SupaUser = data![0]

        if(matchedUser.password != user.password) {
            return ;
        }

        console.log('success')

        const { error } = await supabase.from('users').update({session_id: user.session_id}).eq('username', user.username)
        cookies.set('session', user.session_id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev,
            maxAge: 60 * 60 * 24 * 30
        });
        throw redirect(300, '/')
    }
    ,
    signup: async({request, cookies}: any) => {
        const form = await request.formData()
        const username = form.get('username')
        const password = form.get('password')

        const user: User = {username: username, password: password, session_id: uuidv4()}
        // Create (user)

        // Find (user)

        const matchedUser = await supabase.from('users').select('*').match({username: user.username})

        console.log('MATCHED USER', matchedUser.data)

        if(JSON.stringify(matchedUser.data) == '[]') {
            // CREATE USER
            console.log('creating user')
            const {error} = await supabase.from('users').insert({username: user.username, password: user.password, session_id: user.session_id})
            console.log(error)
        } else {
            return ;
        }
        cookies.set('session', user.session_id, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: !dev,
            maxAge: 60 * 60 * 24 * 30
        });
        throw redirect(300, '/')
    }
    ,
    signout: async({request, cookies}: any) => {
        cookies.delete('session')
        throw redirect(300, '/')
    }
    ,
    meme: async({request, cookies, locals}) => {
        const form: FormData = await request.formData()


        if(!(locals.user.username)) {
            return ;
        }

        const descriere = form.get('descriere')
        const meme = form.get('meme') as File
        const text = await meme.stream()
    
        const uid = uuidv4()
        const {error} = await supabase.storage.from('postfiles').upload(`public/${uid}.png`, meme)
        console.log(error)
        const uname = locals.user.username



        const hey = await supabase.from('posts').insert({filename: `public/${uid}.png`, username: uname, description: descriere})
        console.log(hey.error)
        throw redirect(300, '/')
    }
}