import React from 'react';

interface Block {
    type: string;
    children?: { text: string; bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean }[];
    level?: number;
    list?: 'unordered' | 'ordered';
}

export function BlocksRenderer({ content }: { content: Block[] }) {
    if (!content || !Array.isArray(content)) return null;

    return (
        <div className="space-y-4">
            {content.map((block, index) => {
                switch (block.type) {
                    case 'paragraph':
                        return (
                            <p key={index} className="leading-relaxed">
                                {block.children?.map((child, i) => (
                                    <span key={i} className={cn(
                                        child.bold && "font-bold",
                                        child.italic && "italic",
                                        child.underline && "underline"
                                    )}>
                                        {child.text}
                                    </span>
                                ))}
                            </p>
                        );
                    case 'heading':
                        const HeadingTag = `h${block.level || 1}` as any;
                        const headingClasses: Record<number, string> = {
                            1: "text-3xl font-black uppercase mt-8 mb-4",
                            2: "text-2xl font-black uppercase mt-6 mb-3",
                            3: "text-xl font-black uppercase mt-4 mb-2",
                        };
                        return (
                            <HeadingTag key={index} className={headingClasses[block.level || 1]}>
                                {block.children?.map(c => c.text).join('')}
                            </HeadingTag>
                        );
                    case 'list':
                        const ListTag = block.list === 'ordered' ? 'ol' : 'ul';
                        return (
                            <ListTag key={index} className={cn(
                                "pl-6 space-y-2",
                                block.list === 'ordered' ? "list-decimal" : "list-disc"
                            )}>
                                {block.children?.map((item: any, i) => (
                                    <li key={i}>
                                        {item.children?.map((c: any) => c.text).join('')}
                                    </li>
                                ))}
                            </ListTag>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
