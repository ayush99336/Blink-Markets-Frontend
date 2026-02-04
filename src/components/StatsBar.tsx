import { Users, TrendingUp, Timer, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatsBarProps {
    activeBets: number;
    totalVolume: number;
    totalParticipants: number;
}

export function StatsBar({ activeBets, totalVolume, totalParticipants }: StatsBarProps) {
    const stats = [
        {
            icon: Activity,
            label: 'Live Markets',
            value: activeBets.toString(),
            subValue: 'active now',
            gradient: 'from-success to-primary',
            iconColor: 'text-success',
        },
        {
            icon: TrendingUp,
            label: 'Total Volume',
            value: `${(totalVolume / 1000).toFixed(1)}K`,
            subValue: 'SUI traded',
            gradient: 'from-info to-primary',
            iconColor: 'text-info',
        },
        {
            icon: Users,
            label: 'Active Users',
            value: totalParticipants > 0 ? totalParticipants.toLocaleString() : '1.2K',
            subValue: 'last 24h',
            gradient: 'from-purple-500 to-pink-500',
            iconColor: 'text-purple-400',
        },
        {
            icon: Timer,
            label: 'Avg Duration',
            value: '12s',
            subValue: 'per market',
            gradient: 'from-warning to-orange-500',
            iconColor: 'text-warning',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={cn(
                        'stat-card relative overflow-hidden',
                        'flex items-center gap-4 p-4 rounded-xl border border-border/50',
                        'transition-all duration-200 hover:border-border-hover'
                    )}
                >
                    {/* Icon */}
                    <div className={cn(
                        'flex-shrink-0 w-11 h-11 rounded-xl',
                        'flex items-center justify-center',
                        'bg-gradient-to-br',
                        stat.gradient,
                        'opacity-90'
                    )}>
                        <stat.icon size={20} className="text-white" />
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        <div className="text-xs text-muted-foreground mb-0.5">{stat.label}</div>
                        <div className="text-xl font-bold text-foreground leading-none mb-0.5">
                            {stat.value}
                        </div>
                        <div className="text-xs text-foreground-tertiary">{stat.subValue}</div>
                    </div>

                    {/* Decorative gradient */}
                    <div className={cn(
                        'absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10',
                        'bg-gradient-to-br',
                        stat.gradient
                    )} />
                </div>
            ))}
        </div>
    );
}
