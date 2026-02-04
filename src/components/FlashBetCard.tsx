import { useState } from 'react';
import { FlashBet, CATEGORIES } from '../types/bet';
import { useCountdown } from '../hooks/useCountdown';
import { cn } from '../lib/utils';
import { Zap, Users, ChevronRight } from 'lucide-react';

interface FlashBetCardProps {
    bet: FlashBet;
    onPlaceBet: (betId: string, choice: 'A' | 'B', amount: number) => void;
    isConnected: boolean;
}

const BET_AMOUNTS = [10, 25, 50, 100];

export function FlashBetCard({ bet, onPlaceBet, isConnected }: FlashBetCardProps) {
    const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | null>(null);
    const [betAmount, setBetAmount] = useState<number>(25);
    const [isPlacing, setIsPlacing] = useState(false);

    const duration = bet.expiresAt - bet.createdAt;
    const { percentage, isUrgent, isCritical, isExpired, formattedTime } = useCountdown(
        bet.expiresAt,
        duration
    );

    const handlePlaceBet = async () => {
        if (!selectedChoice || isExpired || !isConnected) return;

        setIsPlacing(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        onPlaceBet(bet.id, selectedChoice, betAmount);
        setIsPlacing(false);
        setSelectedChoice(null);
    };

    const category = CATEGORIES.find(c => c.id === bet.category);

    return (
        <div
            className={cn(
                'group relative flex flex-col rounded-2xl border transition-all duration-300',
                'bg-card hover:bg-card-hover',
                isExpired && 'opacity-50 pointer-events-none',
                isCritical && !isExpired && 'border-danger animate-[shake_0.4s_ease-in-out_infinite]',
                isUrgent && !isExpired && 'border-warning',
                !isUrgent && !isCritical && !isExpired && 'border-border hover:border-border-hover'
            )}
        >
            {/* Progress bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl overflow-hidden bg-secondary">
                <div
                    className={cn(
                        'h-full transition-all duration-100 ease-linear rounded-full',
                        percentage > 50 ? 'bg-success' : percentage > 20 ? 'bg-warning' : 'bg-danger'
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Card Content */}
            <div className="p-5 pt-6 flex-1 flex flex-col">
                {/* Header with category and timer */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Market Image */}
                        {bet.imageUrl && (
                            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-border flex-shrink-0">
                                <img
                                    src={bet.imageUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div>
                            <span className={cn(
                                'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border',
                                category?.color
                            )}>
                                <span>{category?.icon}</span>
                                <span>{category?.label}</span>
                            </span>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div
                        className={cn(
                            'flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-base',
                            isExpired && 'bg-muted text-muted-foreground',
                            isCritical && !isExpired && 'bg-danger-bg countdown-critical',
                            isUrgent && !isExpired && 'bg-warning-bg countdown-warning',
                            !isUrgent && !isCritical && !isExpired && 'bg-success-bg countdown-normal'
                        )}
                    >
                        {!isExpired && <div className="live-dot" />}
                        <span className={cn(
                            isCritical && !isExpired && 'animate-[countdown-tick_1s_ease-in-out_infinite]'
                        )}>
                            {isExpired ? 'CLOSED' : `${formattedTime}s`}
                        </span>
                    </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-1 text-foreground leading-tight">
                    {bet.title}
                </h3>
                {bet.description && (
                    <p className="text-sm text-foreground-tertiary mb-4 line-clamp-2">
                        {bet.description}
                    </p>
                )}

                {/* Outcome Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Option A */}
                    <button
                        onClick={() => !isExpired && setSelectedChoice('A')}
                        disabled={isExpired}
                        className={cn(
                            'outcome-btn outcome-btn-a relative p-4 rounded-xl border-2 text-left transition-all duration-200',
                            selectedChoice === 'A' ? 'selected' : 'border-border bg-secondary hover:border-option-a/50',
                            isExpired && 'cursor-not-allowed'
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm text-foreground truncate">
                                {bet.optionA.shortLabel || bet.optionA.label}
                            </span>
                            <span className="text-option-a font-bold text-lg">
                                {bet.optionA.odds.toFixed(2)}x
                            </span>
                        </div>
                        {/* Progress bar */}
                        <div className="progress-track h-1.5 mb-1">
                            <div
                                className="progress-bar-a h-full rounded-full transition-all duration-300"
                                style={{ width: `${bet.optionA.percentage}%` }}
                            />
                        </div>
                        <span className="text-xs text-foreground-tertiary">
                            {bet.optionA.percentage}% · {bet.optionA.totalBets.toLocaleString()} SUI
                        </span>
                    </button>

                    {/* Option B */}
                    <button
                        onClick={() => !isExpired && setSelectedChoice('B')}
                        disabled={isExpired}
                        className={cn(
                            'outcome-btn outcome-btn-b relative p-4 rounded-xl border-2 text-left transition-all duration-200',
                            selectedChoice === 'B' ? 'selected' : 'border-border bg-secondary hover:border-option-b/50',
                            isExpired && 'cursor-not-allowed'
                        )}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-sm text-foreground truncate">
                                {bet.optionB.shortLabel || bet.optionB.label}
                            </span>
                            <span className="text-option-b font-bold text-lg">
                                {bet.optionB.odds.toFixed(2)}x
                            </span>
                        </div>
                        {/* Progress bar */}
                        <div className="progress-track h-1.5 mb-1">
                            <div
                                className="progress-bar-b h-full rounded-full transition-all duration-300"
                                style={{ width: `${bet.optionB.percentage}%` }}
                            />
                        </div>
                        <span className="text-xs text-foreground-tertiary">
                            {bet.optionB.percentage}% · {bet.optionB.totalBets.toLocaleString()} SUI
                        </span>
                    </button>
                </div>

                {/* Bet Amount Selection - Shows when an option is selected */}
                {selectedChoice && !isExpired && (
                    <div className="animate-[slide-up_0.2s_ease-out] space-y-3 mt-auto">
                        <div className="flex gap-2">
                            {BET_AMOUNTS.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setBetAmount(amount)}
                                    className={cn(
                                        'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                                        betAmount === amount
                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                            : 'bg-secondary hover:bg-accent text-foreground-secondary'
                                    )}
                                >
                                    {amount}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handlePlaceBet}
                            disabled={!isConnected || isPlacing}
                            className={cn(
                                'bet-button w-full py-3 rounded-xl font-semibold transition-all',
                                'flex items-center justify-center gap-2',
                                selectedChoice === 'A'
                                    ? 'bg-gradient-to-r from-option-a to-success text-primary-foreground'
                                    : 'bg-gradient-to-r from-option-b to-warning text-primary-foreground',
                                'hover:opacity-90 active:scale-[0.98]',
                                'disabled:opacity-50 disabled:cursor-not-allowed'
                            )}
                        >
                            {!isConnected ? (
                                'Connect Wallet'
                            ) : isPlacing ? (
                                <span className="flex items-center gap-2">
                                    <span className="animate-spin text-lg">⟳</span> Placing...
                                </span>
                            ) : (
                                <>
                                    <Zap size={18} />
                                    Place {betAmount} SUI
                                    <ChevronRight size={18} />
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Footer Stats */}
                <div className={cn(
                    'flex items-center justify-between pt-4 mt-auto border-t border-border/50 text-sm',
                    selectedChoice && !isExpired && 'mt-3'
                )}>
                    <div className="flex items-center gap-1.5 text-foreground-tertiary">
                        <Users size={14} />
                        <span>{bet.participants} bettors</span>
                    </div>
                    <div className="font-mono font-semibold text-foreground">
                        {bet.totalPool.toLocaleString()} SUI
                    </div>
                </div>
            </div>
        </div>
    );
}
