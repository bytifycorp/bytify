import { MetadataRoute } from "next";
import { getAllPostsMeta, getAllTags } from "@/actions/posts";
import { BASE_URL } from "@/config";

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case "'": return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // Fetch all posts
    const posts = await getAllPostsMeta();

    // Fetch all tags
    const tags = await getAllTags();

    // Generate sitemap entries for posts
    const postEntries = posts.map((post) => ({
        url: escapeXml(`${BASE_URL}/${post.category}/${post.slug}`),
        lastModified: post.date,
    }));

    // Generate sitemap entries for tags
    const tagEntries = tags.map((tag) => ({
        url: escapeXml(`${BASE_URL}/tags/${tag}`),
        lastModified: now,
    }));

    // Generate sitemap entries for categories
    const categories = Array.from(new Set(posts.map((post) => post.category)));
    const categoryEntries = categories.map((category) => ({
        url: escapeXml(`${BASE_URL}/${category}`),
        lastModified: now,
    }));

    // Static pages
    const staticPages = [
        { url: BASE_URL, lastModified: now },
        { url: `${BASE_URL}/about`, lastModified: now },
        { url: `${BASE_URL}/contact`, lastModified: now },
        { url: `${BASE_URL}/privacy-policy`, lastModified: now },
        { url: `${BASE_URL}/terms-and-conditions`, lastModified: now },
    ];

    return [
        ...staticPages,
        ...categoryEntries,
        ...postEntries,
        { url: `${BASE_URL}/tags`, lastModified: now },
        ...tagEntries,
    ];
}