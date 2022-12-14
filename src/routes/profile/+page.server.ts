export async function load({request, locals, cookies, fetch}) {
    const response = await fetch('http://192.168.0.154:3000/bcr/btns')
    return {
        user: await response.json()
    };
}