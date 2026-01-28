export interface UserProps {
    user: {
        id: number | string;
        nombre: string;
        apellidos: string;
        email: string;
        isActive?: boolean;
        rol?: { id: number | string; nombre: string };
        sede?: { id: number | string; ciudad: string };
        contrasena?: string | null;
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
    id?: number;
    name?: string;
    lastName?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
    role?: string | number;
    sede?: string | number;
}


export interface SedeProps {
    sede: {
        id?: number | string;
        ciudad: string;
        direccion: string;
        central?: boolean;
    }
}

export interface SedeCreateModalProps {
    onClose: () => void;
    canCreateCentral: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface SedeEditUserModalProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    userProps: UserProps;
}

export interface Role {
    id: number | string;
    nombre: string;
}

export interface SedeCreateUserModalProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    roles: Role[];
}