import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    icon?: LucideIcon;
    className?: string;
    description?: string;
}

export function SectionHeader({ title, icon: Icon, className, description }: SectionHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-2 mb-8 border-b border-border pb-4", className)}>
            <div className="flex items-center gap-3">
                {Icon && <Icon className="w-6 h-6 text-primary" />}
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-foreground relative inline-block">
                    {title}
                    <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-primary translate-y-5 rounded px-4"></span>
                </h2>
            </div>
            {description && (
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
                    {description}
                </p>
            )}
        </div>
    );
}
