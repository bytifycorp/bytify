"use server";

import { getAllTags, getPostsMetaByPage } from "@/actions/posts";
import BlogCard from "@/components/custom/blog-card";
import { convertToSlug, cn } from "@/lib/utils";
import { notFound } from "next/navigation";

const BlogContainer = async ({ params, searchParams }: { params: { tag: string }; searchParams: { [key: string]: string | undefined } }) => {
    const currentPage = parseInt(searchParams.page || "1");
    const { tag } = params;
    const { posts, totalPages } = await getPostsMetaByPage(currentPage, 1000, tag);

    if (!posts || posts.length === 0) {
        notFound();
    }

    return (
        <section className={cn("py-4 bg-gray-50 dark:bg-gray-900")}>
            <div className={cn("px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5")}>
                <div className="text-center">
                    <h2 className={cn("text-3xl my-8 font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl")}>{tag.split("-").join(" ").toUpperCase()}</h2>
                </div>
                {/* Header and description */}
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
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} /> */}
        </section>
    );
};

export async function generateStaticParams() {
    const tags = await getAllTags(1000);
    return tags.map((tag) => ({ tag: convertToSlug(tag) }));
}

export default BlogContainer;
