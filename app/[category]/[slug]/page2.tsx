"use server";
import { getPostBySlug } from "@/actions/posts";
import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import RecommendedSection from "@/components/custom/recommendedSection";

const dummyPosts = [
    {
        frontmatter: {
            title: "Can You Build Muscle When You’re Older?",
            description: "The answer is a strong yes, and here’s why you should start now.",
            date: "Sep 13, 2021",
            author: "Robert Britt",
            tags: ["Fitness", "Health"],
            featured_image: "https://picsum.photos/1080?" + Math.random(),
            reading_time: 2,
        },
        content: <div></div>,
    },
    {
        frontmatter: {
            title: "The nine-to-five Is Dead. Here’s What to Replace It With",
            description: "Without even reducing the 40-hour work week.",
            date: "Jun 28, 2022",
            author: "Alexander Hipp",
            tags: ["Business", "Productivity"],
            featured_image: "https://picsum.photos/1080?" + Math.random(),
            reading_time: 2,
        },
        content: <div></div>,
    },
    {
        frontmatter: {
            title: "Why the security engineers loves working in fosec",
            description: "Working in cybersecurity means you’re constantly playing a game of catch-up.",
            date: "Jun 21, 2022",
            author: "Anil Vugels",
            tags: ["Security", "Technology"],
            featured_image: "https://picsum.photos/1080?" + Math.random(),
            reading_time: 2,
        },
        content: <div></div>,
    },
];

const BlogPost = async ({ params }: any) => {
    const { slug } = params;

    const post: any = await getPostBySlug(slug as string);

    if (!post) {
        notFound();
    }

    return (
        <>
            <div className="container mx-auto p-4" key={post.frontmatter.slug}>
                <Link href="/blog">Back</Link>
                <img src={post.frontmatter.featured_image} alt={post.frontmatter.title} className="w-full h-64 object-cover rounded-lg" />
                <h1 className="mt-4 text-4xl font-bold">{post.frontmatter.title}</h1>
                <p className="mt-2 text-gray-600">{post.frontmatter.description}</p>
                <p className="mt-1 text-sm text-gray-500">
                    By {post.frontmatter.author} on {new Date(post.frontmatter.date).toDateString()}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {post.frontmatter.tags?.map((tag: string) => (
                        <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-semibold">Content</h2>
                    {post.content}
                </div>
            </div>
            <RecommendedSection posts={dummyPosts} />
        </>
    );
};

export default BlogPost;
