import { Message } from "./interfaces";

export async function getUsers(url: string) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function setComment(message: Partial<Message>) {
    // message = {answered_to_id, title, id..., text, date ...}
    try {
        const res = await fetch('/api/comments', {
            method: "POST",
            body: JSON.stringify(message),
        });
        const data: Message = await res.json();
        console.log(data, 'set data');
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getUserById(url: string, email: string) {
    try {
        const res = await fetch(`${url}/?email=${email}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}