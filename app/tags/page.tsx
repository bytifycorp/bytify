"use server";

import TagCloud from "@/components/custom/tag-cloud";
import { cn } from "@/lib/utils";

const BlogContainer = async ({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | undefined } }) => {
    return (
        <section className={cn("py-4 bg-gray-50 dark:bg-gray-900")}>
            <div className={cn("px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5")}>
                <TagCloud limit={1000} />
            </div>
        </section>
    );
};

export default BlogContainer;
