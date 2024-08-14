"use server"

import { webConfig } from "@/config"
import { compileMDX } from 'next-mdx-remote/rsc'
import { BlogPostType, AuthorType } from "@/types/types"
import { convertToSlug } from "@/lib/utils"


export async function getAllPostsMeta() {
    const MDX_FILES_META: BlogPostType[] = await fetch(`${webConfig.raw_github_repository}/frontmatters.json`, {
        headers: {
            Accept: "application/vnd.github.+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        },
        next: { revalidate: 86400, tags: ['all', 'posts', 'frontmatter'] }
    }).then(res => res.json())

    return MDX_FILES_META
}

export async function getPostsMetaByPage(pageNumber = 1, pageSize = 8, tag: string | null = null, category: string | null = null, author: string | null = null) {
    let MDX_FILES_META: BlogPostType[] = await getAllPostsMeta();

    if (!MDX_FILES_META) {
        return {
            posts: [],
            totalPages: 0
        }
    }

    if (tag) {
        MDX_FILES_META = MDX_FILES_META.filter((post) => {
            for (let i = 0; i < post.tags.length; i++) {
                if (convertToSlug(post.tags[i]) === convertToSlug(tag)) {
                    return true
                }
            }
            return false;
        });
    }

    if (category) {
        MDX_FILES_META = MDX_FILES_META.filter((post) => {
            if (convertToSlug(post.category) === convertToSlug(category)) {
                return true
            }
            return false;
        });
    }

    if (author) {
        MDX_FILES_META = MDX_FILES_META.filter((post) => post.author === author);
    }


    // Calculate total pages
    const totalPages = Math.ceil(MDX_FILES_META.length / pageSize);

    // Calculate the start and end indices for the requested page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Get the posts for the requested page
    const paginatedPosts = MDX_FILES_META.slice(startIndex, endIndex);

    return {
        posts: paginatedPosts,
        totalPages: totalPages
    };
}





export async function getPostBySlug(slug: string): Promise<{ frontmatter: BlogPostType, content: any } | undefined> {
    const res = await fetch(`${webConfig.raw_github_repository}/${slug}.mdx`, {
        headers: {
            Accept: "application/vnd.github.+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28'
        },
        next: { revalidate: 86400, tags: ['all', 'posts'] }
    })

    if (!res.ok) {
        return undefined
    }

    const rawMDX = await res.text()

    if (rawMDX === "404: Not Found") {
        return undefined
    }


    const { frontmatter, content }: { frontmatter: BlogPostType, content: any } = await compileMDX({
        source: rawMDX,
        options: { parseFrontmatter: true }
    })

    return { frontmatter, content };

}


// Fetch related posts by tag
export async function getRelatedPosts(slug: string, limit: number = 5, tag: string | null = null) {
    const allPosts = await getAllPostsMeta();

    // Find the current post to get its tags if tag is not provided
    const currentPost = allPosts.find(post => post.slug === slug);
    if (!currentPost) {
        throw new Error(`Post with slug ${slug} not found`);
    }

    const tagsToUse = tag ? [tag] : currentPost.tags;

    if (!tagsToUse) {
        return [];
    }

    const relatedPosts = allPosts.filter(post =>
        post.slug !== slug && post.tags?.some(postTag => tagsToUse.includes(postTag))
    );

    return relatedPosts.slice(0, limit);
}

// Fetch next and previous posts
export async function getNextPreviousPosts(slug: string) {
    const allPosts = await getAllPostsMeta();
    const currentIndex = allPosts.findIndex(post => post.slug === slug);

    if (currentIndex === -1) {
        return { next: null, previous: null };
    }

    const nextPost = allPosts[currentIndex + 1] || null;
    const previousPost = allPosts[currentIndex - 1] || null;

    return { next: nextPost, previous: previousPost };
}

// Fetch recent posts
export async function getRecentPosts(limit = 5) {
    const allPosts = await getAllPostsMeta();
    const recentPosts = allPosts.slice(0, limit);

    return recentPosts;
}

// Fetch all unique tags with a limit
export async function getAllTags(limit: number = 10) {
    const allPosts = await getAllPostsMeta();

    const tagSet = new Set<string>();

    allPosts.forEach(post => {
        post.tags?.forEach(tag => tagSet.add(tag));
    });

    const allTags = Array.from(tagSet);
    const limitedTags = allTags.slice(0, limit);

    return limitedTags;
}