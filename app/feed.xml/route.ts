import RSS from "rss"
import { BASE_URL, webConfig } from "@/config";
import { getAllPostsMeta } from "@/actions/posts";
import { AuthorType } from "@/types/types";
import { convertToSlug } from "@/lib/utils";

// Make sure you have a baseUrl defined in your config
const defaultAuthor: AuthorType = {
  name: "Bytify", // Replace with your default author details
  image: "author_image_url",
  bio: "Author biography",
  socials: [{ name: "Twitter", href: "https://twitter.com/bytify" }]
};

export async function GET(request: Request) {
  const feed = new RSS({
    title: webConfig.title, // Replace with your site's title
    description: webConfig.description, // Replace with your site's description
    site_url: BASE_URL,
    feed_url: `${BASE_URL}/feed.xml`,
    copyright: `© ${new Date().getFullYear()} ${defaultAuthor.name}`,
    language: "en-US",
    pubDate: new Date(),
  });

  const allPosts = await getAllPostsMeta(); // Fetch all posts metadata

  allPosts
    .filter((post) => post.published) // Only include published posts
    .forEach((post) => {
      feed.item({
        title: post.title,
        guid: `${BASE_URL}/${convertToSlug(post.category)}/${convertToSlug(post.slug)}`,
        url: `${BASE_URL}/${convertToSlug(post.category)}/${convertToSlug(post.slug)}`,
        date: post.date,
        description: post.description || "",
        author: post.author || defaultAuthor.name,
        categories: post.tags || [],
      });
    });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
