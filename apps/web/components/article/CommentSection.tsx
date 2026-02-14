"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CommentItem } from "./CommentItem";
import { MessageSquare, Send } from "lucide-react";

const MOCK_COMMENTS = [
    {
        author: "AlexRider",
        date: "2 hours ago",
        content: "This update is going to change the meta completely. Can't wait to see how the pros adapt to the new map changes.",
        likes: 12,
        replies: [
            {
                author: "GamerPro99",
                date: "1 hour ago",
                content: "Totally agree. The jungle changes look especially impactful.",
                likes: 4
            }
        ]
    },
    {
        author: "EsportFanatic",
        date: "5 hours ago",
        content: "Honestly, I think these changes are a bit rushed. The previous map was fine for competitive play.",
        likes: -2
    }
];

export function CommentSection() {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(MOCK_COMMENTS);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            author: "You",
            date: "Just now",
            content: commentText,
            likes: 0
        };

        setComments([newComment, ...comments]);
        setCommentText("");
    };

    return (
        <section className="mt-16 pt-16 border-t border-border">
            <div className="flex items-center gap-2 mb-8">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-black uppercase tracking-tight">
                    Comments ({comments.length})
                </h2>
            </div>

            {/* Input Section */}
            <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl mb-10 shadow-lg">
                <form onSubmit={handleSubmit} className="flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
                            Y
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <Input
                            placeholder="Add a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="bg-background/50 border-border focus:border-primary transition-all rounded-xl h-12"
                        />
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={!commentText.trim()}
                                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase text-xs tracking-widest px-6"
                            >
                                <Send className="w-4 h-4" />
                                Post
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="divide-y divide-border">
                {comments.map((comment, index) => (
                    <CommentItem key={index} {...comment} />
                ))}
            </div>
        </section>
    );
}
