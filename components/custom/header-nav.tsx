"use client";
import { NAV_ITEMS, webConfig } from "@/config";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

const HeaderNav = () => {
    const [expanded, setExpanded] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Load theme from localStorage on initial load
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
        }
    }, []);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <header className={cn(`relative w-full z-50 bg-white text-black dark:bg-black dark:text-white transition-transform duration-300 shadow-md`)}>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between h-16 lg:h-20">
                        <div className="hidden lg:flex lg:items-center lg:space-x-10">
                            {NAV_ITEMS.main.map((item) => (
                                <Link key={item.name} href={item.href} title={item.name} className="text-base font-medium text-black dark:text-white">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
                            <div className="flex-shrink-0">
                                <Link href="/" title="Home" className="flex text-xl sm:text-2xl font-mono font-black">
                                    {webConfig.name}
                                </Link>
                            </div>
                        </div>
                        <button type="button" className="flex items-center justify-center ml-auto text-black dark:text-white rounded-full w-9 h-9 lg:hidden" onClick={toggleTheme}>
                            {theme === "light" ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                        </button>
                        <button
                            type="button"
                            onClick={toggleExpanded}
                            className="inline-flex p-2 ml-5 text-black dark:text-white transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 dark:focus:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <svg className={cn("w-6 h-6", expanded && "hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6", !expanded && "hidden")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="hidden lg:flex lg:items-center lg:space-x-10">
                            <button type="button" className="flex items-center justify-center w-10 h-10 text-black dark:text-white rounded-full" onClick={toggleTheme}>
                                {theme === "light" ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
            <nav className={cn("py-4 bg-white dark:bg-black lg:hidden border border-gray-300 dark:border-gray-700", !expanded && "hidden")}>
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col space-y-2">
                        {NAV_ITEMS.main.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                title={item.name}
                                className="py-2 text-base font-medium text-black dark:text-white transition-all duration-200 focus:text-blue-600 dark:focus:text-blue-400"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderNav;
