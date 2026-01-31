import { Sede } from "@prisma/client";

export default function SedeEditContent(sede: Sede) {
    return (
        <div>
            <h1>Sede Edit Content</h1>
            <p>{sede.ciudad}</p>
            <p>{sede.direccion}</p>
            <p>{sede.central === true ? "Es central" : "No es central"}</p>
        </div>
    );
}