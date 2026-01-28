'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string | number;
  label: string;
}

interface MotionSelectProps {
  options: Option[];
  value?: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  className?: string; // Prop para estilos adicionales
}

export default function MotionSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = "Seleccionar opción",
  label,
  className
}: MotionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`w-full relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium dark:text-gray-200 mb-2">
          {label}
        </label>
      )}

      {/* Botón Trigger Estilizado como tus Inputs */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-full cursor-pointer rounded-md 
          py-2 px-3 text-left border transition-all duration-200
          outline-none sm:text-sm
          /* Estilos Dark Mode para coincidir con tu imagen */
          dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-white
          ${isOpen 
            ? 'dark:border-zinc-500 ring-2 ring-white/5' 
            : 'hover:dark:border-zinc-600'
          }
        `}
      >
        <span className={`block truncate ${!selectedOption ? 'text-zinc-500' : 'text-white'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </motion.div>
        </span>
      </button>

      {/* Menú Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md 
                       bg-zinc-900 border border-zinc-700 py-1 shadow-2xl outline-none sm:text-sm"
          >
            {options.map((option) => {
                const isSelected = option.value === value;
                return (
                    <li
                        key={option.value}
                        onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                        }}
                        className={`
                        relative cursor-pointer select-none py-2.5 pl-10 pr-4 transition-colors
                        ${isSelected 
                            ? 'bg-white/10 text-white' 
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }
                        `}
                    >
                        {isSelected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                            <Check className="h-4 w-4" />
                        </span>
                        )}
                        <span className="block truncate">{option.label}</span>
                    </li>
                )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}