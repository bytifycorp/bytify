interface AuthorType {
    name: string;
    image: string;
    bio: string;
    socials: {
        name: string;
        href: string;
    }[];
}


interface BlogPostType {
    title: string;
    description: string;
    date: string;
    tags: string[];
    published: boolean;
    featured_image: string;
    author: string;
    category: string;
    slug: string;
    readingTime: string;
}


export type { AuthorType, BlogPostType }