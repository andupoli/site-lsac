import { json } from "@sveltejs/kit";
import { supabase } from "../../db";
import type { RequestHandler } from "../getuser/$types";

export interface MemePost {
    id: number
    filename: string
    username: string
    description: string
    filebloburl: string
}

export const GET: RequestHandler = async () => {
    const {data} = await supabase.from('posts').select('*')
    var my_data: MemePost[] = []
    var retdata: MemePost[] = []
    if(data != null ) {
        my_data = data
        for(var mypost of my_data) {
            
            const par = await supabase.storage.from('postfiles').getPublicUrl(mypost.filename)
            if(par != null && par.data != null) {
                mypost.filebloburl = `${par.data.publicUrl}`

            }
            // console.log(mypost)
            retdata.push(mypost)

        }
    }

    return json(retdata)
}