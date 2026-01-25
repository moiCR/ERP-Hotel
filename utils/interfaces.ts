export interface UserProps {
    user: {
        id: number | string;
        nombre: string;
        apellidos: string;
        email: string;
        estado?: boolean;
        rol?: { id: number | string; nombre: string }; 
        sede?: { id: number | string; ciudad: string };
    }
}

export interface User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    sede: string;
}

export interface PartialUser {
    id? : number;
    name?: string;
    lastName? : string;
    email? : string;
    password ?: string;
    estado ? : boolean;
    role?: string | number;
    sede?: string | number;
}


export interface SedeProps {
    sede: {
        id: number | string;
        ciudad: string;
        direccion: string;
        central?: boolean;
    }
}