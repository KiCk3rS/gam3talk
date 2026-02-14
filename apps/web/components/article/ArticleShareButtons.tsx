"use client";

import { Button } from "@/components/ui/button";
import { Link2, Mail, Check } from "lucide-react";
import { useState } from "react";

interface ArticleShareButtonsProps {
    title: string;
    url: string;
}

export function ArticleShareButtons({ title, url }: ArticleShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/10"
                    asChild
                >
                    <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Share on X"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-[#EA4335] hover:bg-[#EA4335]/10"
                    asChild
                >
                    <a href={`mailto:?subject=${encodeURIComponent(title)}&body=Check out this article: ${url}`} aria-label="Share via Email">
                        <Mail className="w-4 h-4" />
                    </a>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    onClick={handleCopy}
                    aria-label="Copy Link"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                </Button>
            </div>
        </div>
    );
}
