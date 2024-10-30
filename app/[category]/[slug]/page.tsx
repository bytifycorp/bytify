import { getAllPostsMeta, getPostBySlug, getRecentPosts, getRelatedPosts } from "@/actions/posts";
import RecentPosts from "@/components/custom/recent-posts";
import RelatedPosts from "@/components/custom/related-posts";
import TagCloud from "@/components/custom/tag-cloud";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { BASE_URL } from "@/config";
import { BlogPostType } from "@/types/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cn, convertToSlug } from "@/lib/utils";
import Newsletter from "@/components/custom/newsletter";

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

const listOfColors = [
    "239, 68, 68", // bg-red-500
    "59, 130, 246", // bg-blue-500
    "34, 197, 94", // bg-green-500
    "234, 179, 8", // bg-yellow-500
    "168, 85, 247", // bg-purple-500
    "236, 72, 153", // bg-pink-500
    "99, 102, 241", // bg-indigo-500
    "20, 184, 166", // bg-teal-500
    "249, 115, 22", // bg-orange-500
    "107, 114, 128", // bg-gray-500
    "6, 182, 212", // bg-cyan-500
    "16, 185, 129", // bg-emerald-500
    "163, 230, 53", // bg-lime-500
    "244, 63, 94", // bg-rose-500
    "14, 165, 233", // bg-sky-500

    // Additional colors
    "220, 38, 38", // bg-red-600
    "37, 99, 235", // bg-blue-600
    "22, 163, 74", // bg-green-600
    "202, 138, 4", // bg-yellow-600
    "147, 51, 234", // bg-purple-600
    "219, 39, 119", // bg-pink-600
    "79, 70, 229", // bg-indigo-600
    "13, 148, 136", // bg-teal-600
    "234, 88, 12", // bg-orange-600
    "75, 85, 99", // bg-gray-600
    "8, 145, 178", // bg-cyan-600
    "5, 150, 105", // bg-emerald-600
    "132, 204, 22", // bg-lime-600
    "225, 29, 72", // bg-rose-600
    "2, 132, 199", // bg-sky-600
];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * listOfColors.length);
    return listOfColors[randomIndex];
};

const BlogPost = async ({ params }: any) => {
    const { slug, category } = params;

    const post = await getPostBySlug(slug as string);

    if (!post || convertToSlug(post.frontmatter.category?.toLowerCase()) !== convertToSlug(category.toLowerCase())) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(slug, 5);
    const recentPosts = await getRecentPosts(4);

    return (
        <div className={cn("relative")}>
            <section className={cn("relative glass-effect")}>
                <BackgroundGradientAnimation
                    containerClassName="max-h-[40vh] sm:max-h-[70vh] w-full"
                    gradientBackgroundStart="rgba(0, 0, 0, 0.5)"
                    gradientBackgroundEnd="rgba(0, 0, 0, 0.5)"
                    firstColor={getRandomColor()}
                    secondColor={getRandomColor()}
                    thirdColor={getRandomColor()}
                    fourthColor={getRandomColor()}
                    fifthColor={getRandomColor()}
                    pointerColor={getRandomColor()}
                    size="100%"
                >
                    <div className={cn("absolute z-50 inset-0 flex items-center justify-center font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl")}>
                        <div className={cn("bg-clip-text text-white/60 drop-shadow-2xl bg-gradient-to-b from-white/100 to-white/20 max-w-4xl mx-auto text-center")}>
                            <h1 className={cn("mt-5 text-4xl font-bold sm:text-5xl lg:text-6xl font-pj")}>{post.frontmatter.title}</h1>
                            <p className={cn("mt-8 text-lg font-inter")}>
                                {post.frontmatter.author} | {new Date(post.frontmatter.date).toDateString()} | {post.frontmatter.readingTime} min read
                            </p>
                        </div>
                    </div>
                </BackgroundGradientAnimation>
            </section>

            <section className={cn("relative py-0 bg-white dark:bg-gray-900 sm:py-16 lg:py-20")}>
                <div className={cn("px-4 bg-white dark:bg-gray-900 py-10 mx-auto sm:px-6 lg:px-8 max-w-7xl")}>
                    <div className={cn("grid grid-cols-1 gap-y-8 lg:grid-cols-6 lg:gap-x-12 xl:gap-x-20")}>
                        <div className={cn("lg:col-span-4 rounded-xl")}>
                            <article
                                className={cn(
                                    "mt-0 text-base font-normal leading-7 text-gray-700 dark:text-gray-300 font-pj prose dark:prose-invert max-w-full lg:max-w-4xl prose-h2:text-gray-900 dark:prose-h2:text-gray-100 lg:mt-0 lg:prose-lg lg:col-span-8 prose-blockquote:lg:text-xl prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:border-none prose-blockquote:text-lg prose-blockquote:leading-8 prose-blockquote:p-0 prose-blockquote:lg:p-0 prose-blockquote:font-medium prose-blockquote:text-gray-900 dark:prose-blockquote:text-gray-100"
                                )}
                            >
                                {post.content}
                            </article>
                            {/* <section className={cn("py-6 bg-white dark:bg-gray-800 sm:pt-8 lg:pt-10 sm:pb-0 lg:pb-0")}>
                                <div className="mx-auto max-w-7xl">
                                    <div className={cn("w-full border-gray-200 dark:border-gray-700 border")}>
                                        <div className="sm:flex p-6 sm:items-start">
                                            <img
                                                className="object-cover w-24 h-24 rounded-xl shrink-0"
                                                src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-author/3/author-logo.png"
                                                alt=""
                                            />
                                            <div className="mt-6 sm:ml-8 sm:mt-0">
                                                <p className={cn("text-xl font-bold text-gray-900 dark:text-white")}>ClarityUI Team</p>
                                                <p className={cn("mt-4 text-base font-normal text-gray-500 dark:text-gray-400")}>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim dignissim venenatis, donec maecenas.
                                                </p>
                                            </div>
                                        </div>
                                        <hr className={cn("border-gray-200 dark:border-gray-700")} />
                                        <div className="px-6 py-4 sm:flex sm:items-center sm:justify-between">
                                            <p className={cn("text-base font-medium text-gray-500 dark:text-gray-400")}>Follow ClarityUI Team on:</p>
                                            <ul className="flex items-center justify-start mt-4 space-x-5 sm:mt-0 sm:justify-end">
                                                <li>
                                                    <a
                                                        href="#"
                                                        title=""
                                                        className={cn(
                                                            "inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900 dark:hover:text-white"
                                                        )}
                                                    >
                                                        <span className="sr-only"> Discord </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title=""
                                                        className={cn(
                                                            "inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900 dark:hover:text-white"
                                                        )}
                                                    >
                                                        <span className="sr-only"> Twitter </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title=""
                                                        className={cn(
                                                            "inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900 dark:hover:text-white"
                                                        )}
                                                    >
                                                        <span className="sr-only"> Telegram </span>
                                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                                                        </svg>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        title=""
                                                        className={cn(
                                                            "inline-flex items-center justify-center p-1 -m-1 text-gray-400 transition-all duration-200 hover:text-gray-900 dark:hover:text-white"
                                                        )}
                                                    >
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
                        <div className={cn("lg:col-span-2 space-y-10 flex flex-col sm:h-[calc(100vh-64px)] sm:sticky sm:top-8")}>
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
                            {/* <div className={cn("overflow-hidden text-center sm:h-[calc(100vh-64px)] sticky top-8 bg-gray-900 dark:bg-gray-800 rounded-lg")}>
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
                                    <p className={cn("text-xl font-bold text-white")}>Get weekly marketing tips, grow your business</p>
                                    <p className={cn("mt-3 text-sm font-normal leading-6 text-gray-400")}>Lorem ipsum dolor sit amet, consec teta dip iscing elit. Sit quis auctor</p>
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
                                                    className={cn(
                                                        "block w-full px-4 py-3 text-base sm:py-3.5 sm:text-sm font-normal text-center text-white placeholder-gray-400 border border-gray-600 rounded-lg filter backdrop-blur-[6px] bg-gray-900/70 focus:ring-white focus:border-white dark:bg-gray-700/70 dark:border-gray-500 dark:focus:ring-gray-300 dark:focus:border-gray-300"
                                                    )}
                                                    placeholder="Enter email address"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className={cn(
                                                "relative flex items-center justify-center w-full px-4 py-3 text-base sm:py-3.5 border border-transparent font-semibold text-gray-900 dark:text-white transition-all duration-200 bg-white dark:bg-gray-700 rounded-lg sm:text-sm focus:ring-2 focus:ring-offset-gray-900 focus:ring-offset-2 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600"
                                            )}
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
