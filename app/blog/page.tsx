"use server";

import { getPostBySlug, getPostsMetaByPage } from "@/actions/posts";
import Footer from "@/components/custom/footer";
import FooterPromotion from "@/components/custom/footer-promotion";
import HeaderNav from "@/components/custom/header-nav";
import Pagination from "@/components/custom/pagination";
// components/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPost {
    title: string;
    featured_image: string;
    tags: string[];
    category: string;
    author_name: string;
    description: string;
    slug: string;
    readTime: string; // Assume added for simplicity
}

const BlogCard: React.FC<BlogPost> = ({ title, featured_image, category, description, tags, slug, readTime }) => {
    return (
        <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
            <Link href={`/${category}/${slug}`} className="flex shrink-0 aspect-w-4 aspect-h-3">
                <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src={featured_image} alt={title} />
            </Link>
            <div className="flex-1 px-4 py-5 sm:p-6">
                <Link href={`/${category}/${slug}`} className="">
                    <p className="text-lg font-bold text-gray-900">{title}</p>
                    <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">{description}</p>
                </Link>
            </div>
            <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900">
                            <Link href={`/${category}/${slug}`} className="">
                                {category}
                            </Link>
                        </p>
                        <span className="text-sm font-medium text-gray-900"> • </span>
                        <p className="text-sm font-medium text-gray-900">{readTime}</p>
                    </div>

                    <Link href={`/${category}/${slug}`} className="" role="button">
                        <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const BlogContainer = async ({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | undefined } }) => {
    const { posts, totalPages } = await getPostsMetaByPage(1, 8);

    if (!posts) {
        notFound();
    }

    return (
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5">
                <div className="grid grid-cols-1 gap-6 px-8 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
                    {posts.map((post) => (
                        <BlogCard
                            key={post.title}
                            title={post.title}
                            featured_image={post.featured_image + "?" + post.slug}
                            category={post.category}
                            description={post.description}
                            tags={post.tags}
                            readTime={`${post.readingTime} Mins Read`}
                            slug={post.slug}
                            author_name={post.author}
                        />
                    ))}
                </div>
            </div>
            <Pagination currentPage={1} totalPages={totalPages} />
        </section>
    );
};
export default BlogContainer;
