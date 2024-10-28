import { FaceIcon, GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export const webConfig = {
    "name": "Quirky Writes",
    "title": "Quirky Writes",
    "description": "QuirkyWrites.com brings you fresh, engaging articles that inspire curiosity and spark creativity. Dive into a unique blend of thought-provoking insights, fun stories, and quick reads on everything from lifestyle trends to fascinating facts. With bite-sized wisdom and quirky takes, QuirkyWrites is your destination for random, memorable reads that keep you entertained and informed.",
    "tagline": "Where Words Wander Wildly!",
    "github_repository": "https://github.com/bytifycorp/blog-posts",
    "raw_github_repository": "https://raw.githubusercontent.com/bytifycorp/blog-posts/main",
    "website_url": "https://www.quirkywrites.com"
}

export const BASE_URL = webConfig.website_url

export const NAV_ITEMS = {
    main: [
        { name: "Home", href: "/" },
        { name: "Tags", href: "/tags" },
        // { name: "About", href: "/about" },
        // { name: "Contact", href: "/contact" },
    ],
    footer: [
        // { name: "Privacy Policy", href: "/privacy-policy" },
        // { name: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
    social: [
        { name: "Twitter", href: "#", icon: TwitterLogoIcon },
        { name: "Instagram", href: "#", icon: InstagramLogoIcon },
        { name: "GitHub", href: "#", icon: GitHubLogoIcon },
    ],
};

const blogPostCardDesigns = ["default", "outline", "filled"]

const designConfig = {
    blogPostCard: "default",
}

export default designConfig