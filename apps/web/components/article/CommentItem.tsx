"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, Reply, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CommentItemProps {
    author: string;
    avatar?: string;
    date: string;
    content: string;
    likes: number;
    replies?: CommentItemProps[];
    isReply?: boolean;
}

export function CommentItem({
    author,
    avatar,
    date,
    content,
    likes,
    replies,
    isReply = false,
}: CommentItemProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className={cn("group flex gap-4", isReply ? "mt-4 ml-12" : "py-6")}>
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden border border-primary/30">
                    {avatar ? (
                        <img src={avatar} alt={author} className="w-full h-full object-cover" />
                    ) : (
                        author.charAt(0).toUpperCase()
                    )}
                </div>
            </div>

            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-foreground">{author}</span>
                        <span className="text-xs text-muted-foreground">• {date}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {content}
                </p>

                <div className="flex items-center gap-4 pt-1">
                    <button
                        onClick={handleLike}
                        className={cn(
                            "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                            liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <ThumbsUp className={cn("w-3.5 h-3.5", liked && "fill-current")} />
                        {likeCount > 0 && <span>{likeCount}</span>}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
                        <Reply className="w-3.5 h-3.5" />
                        Reply
                    </button>
                </div>

                {replies && replies.length > 0 && (
                    <div className="space-y-4">
                        {replies.map((reply, index) => (
                            <CommentItem key={index} {...reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
