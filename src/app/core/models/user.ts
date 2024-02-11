export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    token: string;
}

export interface RegisterRequest {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface IProfileImage {
    id: number;
    link: any;
}
