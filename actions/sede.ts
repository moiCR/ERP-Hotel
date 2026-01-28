"use server"

import { db } from "@/lib/db";
import { SedeProps } from "@/utils/interfaces";
import { Sede } from "@prisma/client";

export async function createSede(sedeProps: SedeProps) {
    const { ciudad, direccion, central } = sedeProps.sede;

    try {
        await db.sede.create({
            data: {
                ciudad,
                direccion,
                central
            }
        })

        return { success: true, data: "Sede creada exitosamente" };
    } catch {
        return { success: false, error: "Error al crear la sede" };
    }
}


export async function deleteSede(sede : Sede){
    try{
        
        await db.habitacion.deleteMany({
            where: {
                idSede: sede.id
            }
        })
        
        await db.sede.delete({
            where: {
                id: sede.id
            }
        })

    }catch(err){
        return {success: false, error: "Error al eliminar la sede"}
    }finally{
        return{success: true, message: "La sede se ha eliminado exitosamente"}
    }
}

