"use client";

export default function SettingsButton({ onClick }: { onClick: () => void }) {
    return (
        <button className="p-2 w-10 cursor-pointer mx-4 my-4 rounded-xl
                bg-zinc-100 dark:bg-[#2A2A2A] hover:bg-zinc-200 dark:hover:bg-[#111] transition-colors duration-300 
                hover:scale-105"
            aria-label="Settings"
            style={{ viewTransitionName: 'settings-expand' } as React.CSSProperties}
            onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-settings-2"><path stroke="none" d="M0 0h24v24H0z"
                    fill="none" /><path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 
                    -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033"
                /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>
        </button>
    )
}
