export async function load({request, locals, cookies}) {
    return {
        user: JSON.stringify(locals.user)
    };
}