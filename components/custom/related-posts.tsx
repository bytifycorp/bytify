"use client";
import { useState } from "react";
import { BlogPostType } from "@/types/types";
import Link from "next/link";

const RelatedPosts = ({ relatedPosts }: { relatedPosts: BlogPostType[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const postsPerPage = 3;
    const totalPosts = relatedPosts.length;
    const maxIndex = Math.ceil(totalPosts / postsPerPage) - 1;

    const handleNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const displayedPosts = relatedPosts.slice(currentIndex * postsPerPage, (currentIndex + 1) * postsPerPage);

    return (
        <>
            {displayedPosts && displayedPosts.length > 0 && (
                <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="flex items-end justify-between">
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Related posts</h2>
                                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">Read more from the related content you may be interested in.</p>
                            </div>
                            <div className="flex lg:items-center lg:space-x-3">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className={`flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 ${
                                        currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
                                    }`}
                                    disabled={currentIndex === 0}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className={`flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 ${
                                        currentIndex === maxIndex ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
                                    }`}
                                    disabled={currentIndex === maxIndex}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
                            {displayedPosts.map((post, index) => (
                                <div key={post.slug} className="overflow-hidden bg-white rounded shadow">
                                    <div className="p-5">
                                        <div className="relative">
                                            <Link href={`/${post.category}/${post.slug}`} title={post.title} className="block aspect-w-4 aspect-h-3">
                                                <img className="object-cover w-full h-full" src={post.featured_image + "?v=" + post.slug} alt="" />
                                            </Link>
                                            <div className="absolute top-4 left-4">
                                                <Link href={`/${post.category}`}>
                                                    <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full hover:bg-blue-600 hover:text-white">
                                                        {post.category}
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">{post.date}</span>
                                        <p className="mt-5 text-2xl font-semibold">
                                            <Link href={`/${post.category}/${post.slug}`} title={post.title} className="text-black">
                                                {post.title}
                                            </Link>
                                        </p>
                                        <p className="mt-4 text-base text-gray-600 line-clamp-3">{post.description}</p>
                                        <Link
                                            href={`/${post.category}/${post.slug}`}
                                            title="Continue Reading"
                                            className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
                                        >
                                            Continue Reading
                                            <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default RelatedPosts;
