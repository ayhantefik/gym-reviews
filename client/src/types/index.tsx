export interface User {
    displayName: string;
    email: string;
    photoURL: string;
    accessToken?: string;
}

export interface Gym {
    id?: string;
    name: string;
    city: string;
    address: string;
}