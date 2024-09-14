"use server";

import { getPostsMetaByPage } from "@/actions/posts";
import BlogCard from "@/components/custom/blog-card";
import Pagination from "@/components/custom/pagination";
import { notFound } from "next/navigation";

const BlogContainer = async ({ params, searchParams }: { params: { page: string }; searchParams: { [key: string]: string | undefined } }) => {
    const page = parseInt(params.page || "1");
    const { posts, totalPages } = await getPostsMetaByPage(page, 8);

    if (!posts || posts.length === 0) {
        notFound();
    }

    return (
        <section className="py-4 bg-gray-50">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5">
                <div className="grid grid-cols-1 gap-6 px-0 mt-0 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
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
            <Pagination currentPage={page} totalPages={totalPages} />
        </section>
    );
};

export async function generateStaticParams() {
    const { posts, totalPages } = await getPostsMetaByPage();
    return Array.from({ length: totalPages }, (_, i) => ({ page: String(i + 1) }));
}

export default BlogContainer;
