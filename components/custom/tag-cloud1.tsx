// components/TagCloud.js
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Define the variants for the tags
const tagVariants = cva(
    "m-1 px-4 py-1 text-sm font-medium uppercase border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:text-contentColor-dark dark:border-borderColor2-dark dark:hover:text-whiteColor dark:hover:bg-primaryColor dark:hover:border-primaryColor",
    {
        variants: {
            variant: {
                default: "text-contentColor border-borderColor2 hover:text-white hover:bg-primary hover:border-primary",
                outline: "text-primary border-primary hover:bg-primary hover:text-white",
                filled: "bg-primary text-white border-primary hover:bg-primary/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

// TagCloud component interface
export interface TagCloudProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagVariants> {
    tags: Array<{ name: string; href: string }>;
    title?: string;
}

const TagCloud: React.FC<TagCloudProps> = ({ tags, title = "Popular Tags", variant, className, ...props }) => {
    return (
        <div className={cn("p-5 border border-borderColor2 dark:border-borderColor2-dark", className)} {...props}>
            {title && (
                <h4 className="text-lg font-bold pl-2 relative leading-6 mb-6">
                    {title}
                    <span className="absolute bottom-1 left-0 w-1 h-5 bg-primaryColor"></span>
                </h4>
            )}
            <ul className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                    <li key={index}>
                        <Link href={tag.href}>
                            <span className={cn(tagVariants({ variant }))}>{tag.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

TagCloud.displayName = "TagCloud";

export { TagCloud, tagVariants };
