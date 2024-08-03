"use server";
import { getPostsMetaByPage } from "@/actions/posts";
import Link from "next/link";

export default async function Page() {
    const { posts, totalPages } = await getPostsMetaByPage();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {posts &&
                    posts.map((post) => {
                        return (
                            <Link key={post["slug"]} href={`/${post["category"]}/${post["slug"]}`}>
                                <span className="block p-4 border rounded-lg shadow hover:bg-gray-100">
                                    <img src={post.featured_image || "https://picsum.photos/1080?" + Math.random()} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
                                    <h2 className="mt-2 text-xl font-semibold">{post.title}</h2>
                                    <p className="mt-1 text-gray-600">{post.description}</p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        By {post.author} on {new Date(post.date).toDateString()}
                                    </p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {post.tags?.map((tag: string) => (
                                            <span key={tag} className="text-xs bg-gray-200 rounded-full px-2 py-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </span>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
}
