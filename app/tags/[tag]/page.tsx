"use server";

import { getAllPostsMeta, getAllTags, getPostBySlug, getPostsMetaByPage } from "@/actions/posts";
import Footer from "@/components/custom/footer";
import FooterPromotion from "@/components/custom/footer-promotion";
import HeaderNav from "@/components/custom/header-nav";
import Pagination from "@/components/custom/pagination";
import { convertToSlug } from "@/lib/utils";
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

const BlogContainer = async ({ params, searchParams }: { params: { tag: string }; searchParams: { [key: string]: string | undefined } }) => {
    const currentPage = parseInt(searchParams.page || "1");
    const { tag } = params;
    const { posts, totalPages } = await getPostsMetaByPage(currentPage, 1000, tag);

    if (!posts || posts.length === 0) {
        notFound();
    }

    return (
        <section className="py-4 bg-gray-50">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5">
                <div className="text-center">
                    <h2 className="text-3xl my-8 font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">{tag.toUpperCase()}</h2>
                </div>
                {/* Header and description */}
                <div className="grid grid-cols-1 gap-6 px-0 mt-0 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
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
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} /> */}
        </section>
    );
};

export async function generateStaticParams() {
    const tags = await getAllTags(1000);
    return tags.map((tag) => ({ tag: convertToSlug(tag) }));
}

export default BlogContainer;
