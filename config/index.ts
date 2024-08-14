import { FaceIcon, GitHubLogoIcon, InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export const webConfig = {
    "name": "Bytify",
    "description": "My Blog",
    "github_repository": "https://github.com/bytifycorp/blog-posts",
    "raw_github_repository": "https://raw.githubusercontent.com/bytifycorp/blog-posts/main"
}

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