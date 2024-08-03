"use server";

import Link from "next/link";

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
        <div className="py-12 sm:py-16">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex items-center justify-center space-x-2">
                    {currentPage > 1 && (
                        <Link
                            href={`/blog/1`}
                            className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
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
                            className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
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
                            className={`inline-flex items-center justify-center text-base font-semibold transition-all duration-200 ${
                                currentPage === page ? "bg-gray-900 text-white border-gray-900 pointer-events-none" : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 cursor-pointer"
                            } rounded-md sm:text-sm w-9 h-9`}
                        >
                            {page}
                        </Link>
                    ))}

                    {currentPage < totalPages && (
                        <Link
                            href={`/blog/${currentPage + 1}`}
                            className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
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
                            className="inline-flex items-center justify-center text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md w-9 h-9 hover:bg-gray-50"
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
