import { writable } from 'svelte/store';

export const registerInput = writable({});
export const loginInput = writable({});
export const user = writable(null);
export const fields = writable({});
export const errors = writable({});
export const dirty = writable({});
export const message = writable(null);
export const btnDisabled = writable(true);