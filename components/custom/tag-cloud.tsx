"use server";

import { getAllTags } from "@/actions/posts";
import { convertToSlug, cn } from "@/lib/utils";
import Link from "next/link";

const TagCloud = async ({ limit = 10 }) => {
    const tags = await getAllTags(limit);

    return (
        <div className={cn("dark:bg-gray-900")}>
            <p className={cn("text-lg font-bold text-gray-900 dark:text-white")}>Tags</p>
            <div className="flex flex-wrap mt-5 gap-2.5">
                {tags.map((tag) => (
                    <Link href={`/tags/${convertToSlug(tag)}`} key={tag} className="inline-block">
                        <span
                            className={cn(
                                "inline-flex items-center px-3 py-2 text-sm font-medium",
                                "text-gray-900 dark:text-gray-200",
                                "transition-all duration-200",
                                "bg-white dark:bg-gray-800",
                                "border border-gray-200 dark:border-gray-700",
                                "rounded-md",
                                "hover:bg-gray-50 dark:hover:bg-gray-700"
                            )}
                        >
                            {tag}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TagCloud;
