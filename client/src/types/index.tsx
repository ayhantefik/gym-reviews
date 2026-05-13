export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    accessToken?: string;
}

export interface Gym {
    _id?: string;
    name: string;
    city: string;
    address: string;
}

export interface Review {
    _id?: string;
    gymId: string;
    uid: string;
    rating: number;
}