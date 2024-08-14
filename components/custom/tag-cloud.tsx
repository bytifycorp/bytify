"use server";

import { getAllTags } from "@/actions/posts";
import Link from "next/link";

const TagCloud = async ({ limit = 10 }) => {
    const tags = await getAllTags(limit);

    return (
        <div>
            <p className="text-lg font-bold text-gray-900">Tags</p>
            <div className="flex flex-wrap mt-5 gap-2.5">
                {tags.map((tag) => (
                    <Link href={`/tags/${tag.replace(/\s+/g, "-").toLowerCase()}`} key={tag} className="inline-block">
                        <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                            {tag}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagCloud;
