"use client";

import { NAV_ITEMS, webConfig } from "@/config";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="py-12 bg-white dark:bg-gray-900 sm:pt-16 lg:pt-12 border-t border-gray-300 dark:border-gray-700">
            <div className="px-0 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div>
                        <Link href="/" title="Home" className="flex text-xl sm:text-2xl font-mono font-black">
                            {webConfig.name}
                        </Link>
                    </div>
                    <ul className="flex items-center justify-center mt-8 space-x-6 sm:mt-12 sm:space-x-16 lg:mt-0">
                        {NAV_ITEMS.main.map((item: any, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    title={item.name}
                                    className="text-lg font-medium text-gray-900 dark:text-gray-300 transition-all duration-200 font-pj hover:text-gray-600 dark:hover:text-gray-400"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="flex items-center justify-center mt-8 space-x-3 sm:mt-12 lg:justify-end lg:mt-0">
                        {NAV_ITEMS.social.map((item: any, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    target="_blank"
                                    title={item.name}
                                    className="inline-flex items-center justify-center w-10 h-10 text-gray-900 dark:text-gray-300 transition-all duration-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-200 dark:focus:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700"
                                    rel="noopener"
                                >
                                    <item.icon className="w-5 h-5" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <hr className="mt-10 border-gray-300 dark:border-gray-700" />
                <div className="mt-10 md:flex md:items-center md:justify-between">
                    <ul className="flex items-center justify-center space-x-6 md:order-2 md:justify-end">
                        {NAV_ITEMS.footer.map((item: any, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    title={item.name}
                                    className="text-base font-normal text-gray-600 dark:text-gray-400 transition-all duration-200 font-pj hover:text-gray-900 dark:hover:text-gray-300"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-base font-normal text-center text-gray-600 dark:text-gray-400 md:text-left md:mt-0 md:order-1 font-pj">
                        © Copyright {new Date().getFullYear()}, All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
