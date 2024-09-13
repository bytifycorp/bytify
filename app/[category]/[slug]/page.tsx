import { getAllPostsMeta, getPostBySlug, getRecentPosts, getRelatedPosts } from "@/actions/posts";
import RecentPosts from "@/components/custom/recent-posts";
import RelatedPosts from "@/components/custom/related-posts";
import TagCloud from "@/components/custom/tag-cloud";
import { BASE_URL } from "@/config";
import { BlogPostType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        return {};
    }

    const ogImage = `${BASE_URL}/api/og?title=${encodeURIComponent(post.frontmatter.title)}&author=${encodeURIComponent(post.frontmatter.author)}&date=${encodeURIComponent(post.frontmatter.date)}`;

    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: "article",
            publishedTime: post.frontmatter.date,
            authors: [post.frontmatter.author],
            tags: post.frontmatter.tags,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.frontmatter.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            images: [ogImage],
        },
    };
}

const BlogPost = async ({ params }: any) => {
    const { slug, category } = params;

    const post = await getPostBySlug(slug as string);

    if (!post || post.frontmatter.category?.toLowerCase() !== category.toLowerCase()) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, 5);
    const recentPosts = await getRecentPosts(4);

    return (
        <div className="relative">
            <section className="featured-image-container relative">
                <div className=" pt-6 pb-6 px-4 sm:pt-32 sm:pb-32 min-h-[40vh] sm:min-h-[70vh] w-full flex justify-center items-center glass-effect">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-100 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">{post.frontmatter.title}</h1>
                        <p className="mt-8 text-base text-gray-50 font-inter">
                            {post.frontmatter.author} | {new Date(post.frontmatter.date).toDateString()} | {post.frontmatter.readingTime} min read
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative py-0 bg-white sm:py-16 lg:py-20">
                <div className="px-4 bg-white py-10 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-6 lg:gap-x-12 xl:gap-x-20">
                        <div className="lg:col-span-4 rounded-xl">
                            <article className="mt-0 text-base font-normal leading-7 text-gray-700 font-pj prose max-w-full lg:max-w-4xl prose-h2:text-gray-900 lg:mt-0 lg:prose-lg lg:col-span-8 prose-blockquote:lg:text-xl prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:border-none prose-blockquote:text-lg prose-blockquote:leading-8 prose-blockquote:p-0 prose-blockquote:lg:p-0 prose-blockquote:font-medium prose-blockquote:text-gray-900">
                                {post.content}
                            </article>
                            {/* <section className="py-6 bg-white sm:pt-8 lg:pt-10 sm:pb-0 lg:pb-0">
                                <div className="mx-auto max-w-7xl">
                                    <div className="w-full border-gray-200 border">
                                        <div className="sm:flex p-6 sm:items-start">
                                            <img
                                                className="object-cover w-24 h-24 rounded-xl shrink-0"
                                                src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-author/3/author-logo.png"
                                                alt=""
                                            />
                                            <div className="mt-6 sm:ml-8 sm:mt-0">
                                                <p className="text-xl font-bold text-gray-900">ClarityUI Team</p>
                                                <p className="mt-4 text-base font-normal text-gray-500">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim dignissim venenatis, donec maecenas.
                                                </p>
                                            </div>
                                        </div>
                                        <hr className="border-gray-200" />
                                        <div className="px-6 py-4 sm:flex sm:items-center sm:justify-between">
                                            <p className="text-base font-medium text-gray-500">Follow ClarityUI Team on:</p>
                                            <ul className="flex items-center justify-start mt-4 space-x-5 sm:mt-0 sm:justify-end">
                                                <li>
                                                    <a href="#" title="" className="inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900">
                                                        <span className="sr-only"> Discord </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="" className="inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900">
                                                        <span className="sr-only"> Twitter </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="" className="inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900">
                                                        <span className="sr-only"> Telegram </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="" className="inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900">
                                                        <span className="sr-only"> YouTube </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section> */}
                        </div>
                        <div className="lg:col-span-2 space-y-10 flex flex-col">
                            {/* RECENT POSTS */}
                            <RecentPosts recentPosts={recentPosts} />
                            {/* END RECENT POSTS */}

                            {/* TAG CLOUD */}
                            <TagCloud />
                            {/* END TAG CLOUD */}

                            {/* MAILING LIST SIGNUP */}
                            {/* <Newsletter /> */}
                            {/* END MAILING LIST SIGNUP */}

                            {/* AD COMPONENT */}
                            {/* <div className="overflow-hidden text-center sm:h-[calc(100vh-64px)] sticky top-8 bg-gray-900 rounded-lg">
                                <div className="absolute inset-0">
                                    <img
                                        className="object-cover w-full h-full"
                                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/sidebar-newsletter/4/line-pattern.svg"
                                        alt=""
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-0">
                                    <div
                                        className="w-full h-64 mx-auto blur-2xl opacity-40 filter"
                                        style={{
                                            background: "linear-gradient(90deg, #4484ff -0.55%, #44b0ff 22.86%, #ff44ec 48.36%, #44a5ff 73.33%, #f2ff5e 99.34%)",
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-0">
                                    <img className="object-contain w-full h-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/sidebar-newsletter/4/man-1.png" alt="" />
                                </div>
                                <div className="relative px-4 py-5 sm:p-6">
                                    <p className="text-xl font-bold text-white">Get weekly marketing tips, grow your business</p>
                                    <p className="mt-3 text-sm font-normal leading-6 text-gray-400">Lorem ipsum dolor sit amet, consec teta dip iscing elit. Sit quis auctor</p>
                                    <form action="#" method="POST" className="mt-56 space-y-4">
                                        <div>
                                            <label htmlFor="" className="sr-only">
                                                Email address
                                            </label>
                                            <div>
                                                <input
                                                    type="email"
                                                    name=""
                                                    id=""
                                                    className="block w-full px-4 py-3 text-base sm:py-3.5 sm:text-sm font-normal text-center text-white placeholder-gray-400 border border-gray-600 rounded-lg filter backdrop-blur-[6px] bg-gray-900/70 focus:ring-white focus:border-white"
                                                    placeholder="Enter email address"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="relative flex items-center justify-center w-full px-4 py-3 text-base sm:py-3.5 border border-transparent font-semibold text-gray-900 transition-all duration-200 bg-white rounded-lg sm:text-sm focus:ring-2 focus:ring-offset-gray-900 focus:ring-offset-2 focus:outline-none hover:bg-gray-100"
                                        >
                                            Join Now
                                        </button>
                                    </form>
                                </div>
                            </div> */}
                            {/* END AD COMPONENT */}
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED POST */}
            <RelatedPosts relatedPosts={relatedPosts} />
            {/* END OF RELATED POSTS */}
        </div>
    );
};

export async function generateStaticParams() {
    const posts: BlogPostType[] = await getAllPostsMeta();
    return posts.map((post) => ({
        slug: post.slug,
        category: post.category,
    }));
}

export default BlogPost;
