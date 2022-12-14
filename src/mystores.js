import { writable } from "svelte/store";

export const didClickLogin = writable(false)
export const didClickSignUp = writable(false)
export const didClickSignOut = writable(false)