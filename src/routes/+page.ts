export async function load({parent, fetch}) {
    const user = await parent()
    const res = await fetch('api/getmemes');
    const dat = await res.json()
    return {
        user: user,
        memes: dat
    };
}