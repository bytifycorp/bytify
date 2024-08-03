type BlogPost = {
    frontmatter: {
        title: string
        description: string
        date: string
        author: string
        tags: string[]
        featured_image: string
        reading_time: number
    }
    content: ReactElement<any, string | JSXElementConstructor<any>>
}

type Author = {
    name: string
    image: string
    bio: string
    socials: { name: string; href: string }[]
}

type Tag = {
    name: string
    href: string
}