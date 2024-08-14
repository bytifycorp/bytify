import React from "react";
import Link from "next/link";
import { convertToSlug } from "@/lib/utils";

interface BlogPost {
    frontmatter: {
        title: string;
        description: string;
        date: string;
        author: string;
        category: string;
        tags: string[];
        featured_image: string;
        reading_time: number;
    };
}

interface BlogPostCardProps {
    post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
    const { title, description, category, date, author, featured_image, reading_time, tags } = post.frontmatter;

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="p-6 flex-grow">
                    <p className={`uppercase text-xs font-semibold tracking-wider ${tags.includes("New") ? "text-red-600" : "text-gray-600"}`}>{tags.includes("New") ? "NEW" : "RELATED"}</p>
                    <ul className="flex text-sm text-gray-500 space-x-2 mt-2">
                        <li className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                                <line x1="16" y1="3" x2="16" y2="7"></line>
                                <line x1="8" y1="3" x2="8" y2="7"></line>
                                <line x1="4" y1="11" x2="20" y2="11"></line>
                                <rect x="8" y="15" width="2" height="2"></rect>
                            </svg>
                            {date}
                        </li>
                        <li>•</li>
                        <li className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="4" y="4" width="16" height="16" rx="1"></rect>
                                <path d="M12 7v5l3 3"></path>
                                <path d="M4 12h1"></path>
                                <path d="M19 12h1"></path>
                                <path d="M12 19v1"></path>
                            </svg>
                            {reading_time} min read
                        </li>
                    </ul>
                    <h3 className="mt-4 text-lg font-semibold">
                        <Link href={`/${category}/${convertToSlug(title)}`}>
                            <span className="hover:underline">{title}</span>
                        </Link>
                    </h3>
                    <p className="mt-2 text-gray-700">{description}</p>
                </div>
                <div className="p-6 bg-gray-100 flex items-center mt-auto">
                    <img src={featured_image} alt={author} className="w-10 h-10 rounded-full mr-4" />
                    <span className="text-gray-700">by {author}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;
