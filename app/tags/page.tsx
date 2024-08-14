"use server";
import TagCloud from "@/components/custom/tag-cloud";

const BlogContainer = async ({ params, searchParams }: { params: { slug: string }; searchParams: { [key: string]: string | undefined } }) => {
    return (
        <section className="py-4 bg-gray-50">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl mb-5">
                <TagCloud />
            </div>
        </section>
    );
};
export default BlogContainer;
