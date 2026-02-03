export const EditIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="icon icon-tabler"
            viewBox="0 0 24 24"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
            <path d="M16 5l3 3" />
        </svg>
    );
}

export const TrashIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
            viewBox="0 0 24 24"
        >
            <path fill="none" stroke="none" d="M0 0h24v24H0z" />
            <path d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
        </svg>
    );
}

export const PlusIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
            viewBox="0 0 24 24"
        >
            <path fill="none" stroke="none" d="M0 0h24v24H0z" />
            <path d="M12 5v14m-7-7h14" />
        </svg>
    );
}

export const RoomIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            className="icon icon-tabler icons-tabler-outline icon-tabler-door"
            viewBox="0 0 24 24"
        >
            <path fill="none" stroke="none" d="M0 0h24v24H0z"/>
            <path d="M14 12v.01M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
        </svg>
    );
}


export const UserIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            fill="currentColor" 
            className="icon icon-tabler icons-tabler-filled icon-tabler-user" 
            viewBox="0 0 24 24"
        >
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M12 2a5 5 0 1 1-5 5l.005-.217A5 5 0 0 1 12 2m2 12a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5z"/>
        </svg>
    );
}


export const XLSIcon = ({ size = 24 }: { size?: number }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-xls"
            viewBox="0 0 24 24"
        >
            <path fill="none" stroke="none" d="M0 0h24v24H0z"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M4 15l4 6" />
            <path d="M4 21l4 -6" />
            <path d="M17 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75" />
            <path d="M11 15v6h3" />
        </svg>
    );
}

export const PDFIcon = ({ size = 24 }: { size?: number }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
            <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
            <path d="M17 18h2" />
            <path d="M20 15h-3v6" />
            <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1" />
        </svg>
    );
}