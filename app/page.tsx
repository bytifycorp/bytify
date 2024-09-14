"use server";

import { getPostsMetaByPage } from "@/actions/posts";
import Pagination from "@/components/custom/pagination";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import BlogCard from "@/components/custom/blog-card";

const BlogContainer = async ({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | undefined } }) => {
    const currentPage = parseInt(searchParams.page || "1");
    const { posts, totalPages } = await getPostsMetaByPage(currentPage, 8);

    if (!posts) {
        notFound();
    }

    return (
        <section className={cn("py-4 bg-gray-50 dark:bg-gray-900")}>
            <div className={cn("px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5")}>
                <div className={cn("grid grid-cols-1 gap-6 px-0 mt-0 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0")}>
                    {posts.map((post) => (
                        <BlogCard
                            key={post.title}
                            title={post.title}
                            featured_image={post.featured_image}
                            category={post.category}
                            description={post.description}
                            tags={post.tags}
                            readingTime={`${post.readingTime} Mins Read`}
                            slug={post.slug}
                            author={post.author}
                            date={post.date}
                            published={post.published}
                        />
                    ))}
                </div>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
};

export default BlogContainer;
