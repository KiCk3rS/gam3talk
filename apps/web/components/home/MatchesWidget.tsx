import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const matches = [
    {
        id: 1,
        team1: "T1",
        team2: "GEN",
        time: "LIVE",
        score: "1 - 1",
        league: "LCK",
        isLive: true,
    },
    {
        id: 2,
        team1: "G2",
        team2: "FNC",
        time: "18:00",
        score: "-",
        league: "LEC",
        isLive: false,
    },
    {
        id: 3,
        team1: "TL",
        team2: "C9",
        time: "21:00",
        score: "-",
        league: "LCS",
        isLive: false,
    },
    {
        id: 4,
        team1: "SEN",
        team2: "100T",
        time: "Tomorrow",
        score: "-",
        league: "VCT Americas",
        isLive: false,
    },
];

export function MatchesWidget() {
    return (
        <Card className="h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Upcoming Matches</CardTitle>
                    <Link href="/matches" className="text-sm text-primary hover:underline">
                        View Schedule
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="px-0">
                <div className="space-y-4">
                    {matches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border hover:bg-card transition-colors">
                            <div className="flex flex-col items-center min-w-[3rem]">
                                <span className="font-bold">{match.time}</span>
                                {match.isLive && (
                                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mt-1" />
                                )}
                            </div>
                            <div className="flex-1 px-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                                        {match.team1.substring(0, 1)}
                                    </div>
                                    <span className="font-semibold">{match.team1}</span>
                                </div>
                                <span className="text-muted-foreground px-2">{match.score}</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">{match.team2}</span>
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                                        {match.team2.substring(0, 1)}
                                    </div>
                                </div>
                            </div>
                            <Badge variant="outline" className="ml-2 w-16 justify-center">
                                {match.league}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
