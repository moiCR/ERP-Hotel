"use client"

import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            // Estado inicial: Invisible y un poco más abajo (y: 20)
            initial={{ opacity: 0, y: 20 }}
            
            // Estado final: Visible y en su posición original (y: 0)
            animate={{ opacity: 1, y: 0 }}
            
            // Transición suave
            transition={{ duration: 0.4, ease: "easeOut" }}
            
            // Aseguramos que ocupe el espacio correcto
            className="w-full h-full"
        >
            {children}
        </motion.div>
    )
}