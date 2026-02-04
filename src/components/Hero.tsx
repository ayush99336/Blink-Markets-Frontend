import { Zap, Timer, Shield, Gauge } from 'lucide-react';

export function Hero() {
    return (
        <div className="relative py-16 mb-8 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/20 via-info/10 to-purple-500/20 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="text-center max-w-4xl mx-auto">
                {/* Logo */}
                <div className="inline-flex items-center gap-3 mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center">
                            <Zap size={28} className="text-white" fill="currentColor" />
                        </div>
                    </div>
                    <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
                        <span className="gradient-text-animated">Blink</span>
                        <span className="text-foreground">Market</span>
                    </h1>
                </div>

                {/* Tagline */}
                <p className="text-xl md:text-2xl text-foreground-secondary mb-4 leading-relaxed">
                    Flash betting for live events.{' '}
                    <span className="text-primary font-semibold">10-second markets.</span>{' '}
                    <span className="text-foreground font-semibold">Instant settlement.</span>
                </p>
                <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Place ultra-fast bets on the next play, next score, or next price movement.
                    Powered by Sui's lightning-fast blockchain for sub-second finality.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                    {[
                        { icon: Timer, label: '10s Markets', color: 'text-success' },
                        { icon: Gauge, label: 'Sui Speed', color: 'text-info' },
                        { icon: Zap, label: 'Instant Payouts', color: 'text-warning' },
                        { icon: Shield, label: 'Fully On-Chain', color: 'text-purple-400' },
                    ].map((feature) => (
                        <div
                            key={feature.label}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/80 border border-border text-sm font-medium transition-all hover:bg-accent hover:border-border-hover"
                        >
                            <feature.icon size={16} className={feature.color} />
                            <span className="text-foreground">{feature.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
