import { FlashBet, CATEGORIES } from '../types/bet';
import { cn } from '../lib/utils';
import { CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';

interface RecentBetsProps {
    bets: FlashBet[];
}

export function RecentBets({ bets }: RecentBetsProps) {
    if (bets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                    <Clock className="text-muted-foreground" size={28} />
                </div>
                <p className="font-medium text-foreground-secondary">No results yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                    Completed markets will appear here
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {bets.map((bet, index) => {
                const category = CATEGORIES.find(c => c.id === bet.category);
                const winnerOption = bet.winner === 'A' ? bet.optionA : bet.optionB;
                const loserOption = bet.winner === 'A' ? bet.optionB : bet.optionA;

                return (
                    <div
                        key={bet.id}
                        className={cn(
                            'p-4 rounded-xl bg-secondary/50 border border-border/50',
                            'transition-all duration-300',
                            index === 0 && 'animate-[slide-up_0.3s_ease-out]'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2 min-w-0">
                                {bet.imageUrl && (
                                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={bet.imageUrl} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <div className="font-medium text-sm text-foreground truncate">
                                        {bet.title}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {category?.icon} {category?.label}
                                    </span>
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                Just now
                            </span>
                        </div>

                        {/* Result */}
                        <div className="flex items-center gap-2">
                            <div className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-success-bg border border-success/30">
                                <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                                <span className="text-sm font-medium text-success truncate">
                                    {winnerOption?.label}
                                </span>
                                <span className="ml-auto text-xs font-mono text-success">
                                    {winnerOption?.odds.toFixed(2)}x
                                </span>
                            </div>
                            <div className="flex-1 flex items-center gap-2 p-2 rounded-lg bg-danger-bg/50 border border-danger/20 opacity-60">
                                <XCircle size={14} className="text-danger flex-shrink-0" />
                                <span className="text-sm text-danger truncate">
                                    {loserOption?.label}
                                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp size={12} />
                                <span>{bet.totalPool.toLocaleString()} SUI pool</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {bet.participants} participants
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
