"use server";

import { BlogPostType } from "@/types/types";
import Link from "next/link";

const RecentPosts = ({ recentPosts }: { recentPosts: BlogPostType[] }) => {
    return (
        <div>
            <p className="text-xl font-bold text-gray-900">Recent Posts</p>
            <div className="mt-6 space-y-2">
                {recentPosts.map((post, index) => (
                    <div
                        key={post.slug}
                        className="relative overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:bg-gray-50 hover:-translate-y-1"
                    >
                        <div className="p-4">
                            <div className="flex items-start lg:items-center">
                                <img className="object-cover w-20 h-20 rounded-lg shrink-0" src={post.featured_image + "?" + post.slug} alt={post.title} />
                                <div className="ml-5">
                                    <p className="text-xs font-normal text-gray-900">{post.date}</p>
                                    <p className="font-medium text-gray-900 mt-1">
                                        <Link href={`/${post.category}/${post.slug}`} title={post.title}>
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
