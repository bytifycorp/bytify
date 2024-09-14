"use server";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    // Calculate the visible pages
    const visiblePages = 4;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust the startPage if we're at the end of totalPages range
    if (endPage === totalPages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return (
        <div className={cn("py-12 sm:py-16 dark:bg-gray-900")}>
            <div className={cn("px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl")}>
                <div className={cn("flex items-center justify-center space-x-2")}>
                    {currentPage > 1 && (
                        <Link
                            href={`/blog/1`}
                            className={cn(
                                "inline-flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md w-9 h-9 hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                        >
                            <span className="sr-only">Start</span>
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                            </svg>
                        </Link>
                    )}

                    {currentPage > 1 && (
                        <Link
                            href={`/blog/${currentPage - 1}`}
                            className={cn(
                                "inline-flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md w-9 h-9 hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                        >
                            <span className="sr-only">Previous</span>
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                    )}

                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page, index) => (
                        <Link
                            key={index}
                            href={`/blog/${page}`}
                            className={cn(
                                "inline-flex items-center justify-center text-base font-semibold transition-all duration-200 rounded-md sm:text-sm w-9 h-9",
                                currentPage === page
                                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border-gray-900 dark:border-gray-100 pointer-events-none"
                                    : "text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            )}
                        >
                            {page}
                        </Link>
                    ))}

                    {currentPage < totalPages && (
                        <Link
                            href={`/blog/${currentPage + 1}`}
                            className={cn(
                                "inline-flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md w-9 h-9 hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                        >
                            <span className="sr-only">Next</span>
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    )}

                    {currentPage < totalPages && (
                        <Link
                            href={`/blog/${totalPages}`}
                            className={cn(
                                "inline-flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md w-9 h-9 hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                        >
                            <span className="sr-only">Last</span>
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pagination;
