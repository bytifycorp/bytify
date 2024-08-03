import React from "react";
import BlogPostCard from "@/components/custom/blog-post-card";
import Link from "next/link";

interface BlogPost {
    frontmatter: {
        title: string;
        description: string;
        date: string;
        author: string;
        tags: string[];
        featured_image: string;
        reading_time: number;
    };
    content: React.ReactElement;
}

interface RecommendedSectionProps {
    posts: BlogPost[];
}

const RecommendedSection: React.FC<RecommendedSectionProps> = ({ posts }) => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Keep Reading</h2>
                    <Link href="/blog">
                        <span className="text-blue-600 hover:underline flex items-center">
                            All Posts
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="flex flex-wrap -mx-4">
                    {posts.map((post, index) => (
                        <BlogPostCard key={index} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedSection;
