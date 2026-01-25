export default function Button({ children, className, ...props }: { children: React.ReactNode, className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={className + " font-bold text-white dark:text-black bg-black dark:bg-white px-4 py-2 rounded-xl hover:scale-x-110 hover:scale-y-105 transition-all duration-300" + " " + className} {...props}>{children}</button>
    )
}