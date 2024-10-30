"use client";

import { BlogPostType } from "@/types/types";
import Link from "next/link";
import { cn, convertToSlug } from "@/lib/utils";

const RecentPosts = ({ recentPosts }: { recentPosts: BlogPostType[] }) => {
    return (
        <div className={cn("dark:bg-gray-900")}>
            <p className={cn("text-xl font-bold text-gray-900 dark:text-white")}>Recent Posts</p>
            <div className="mt-6 space-y-2">
                {recentPosts.map((post, index) => (
                    <div
                        key={post.slug}
                        className={cn(
                            "relative overflow-hidden transition-all duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg",
                            "hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-y-1"
                        )}
                    >
                        <div className="p-4">
                            <div className="flex items-start lg:items-center">
                                <img className="object-cover w-20 h-20 rounded-lg shrink-0" src={post.featured_image + "?" + post.slug} alt={post.title} />
                                <div className="ml-5">
                                    <p className={cn("text-xs font-normal text-gray-900 dark:text-gray-300")}>{post.date}</p>
                                    <p className={cn("font-medium text-gray-900 dark:text-white mt-1")}>
                                        <Link href={`/${convertToSlug(post.category)}/${convertToSlug(post.slug)}`} title={post.title}>
                                            {post.title}
                                            <span className="absolute inset-0" aria-hidden="true" />
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentPosts;
