import { Zap, Timer, Shield, Gauge, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        { icon: Timer, label: '10s Markets', color: 'text-[#00E5A0]', bgColor: 'bg-[#00E5A0]/10' },
        { icon: Gauge, label: 'Sui Speed', color: 'text-[#4DA2FF]', bgColor: 'bg-[#4DA2FF]/10' },
        { icon: Zap, label: 'Instant Payouts', color: 'text-[#00D4FF]', bgColor: 'bg-[#00D4FF]/10' },
        { icon: Shield, label: 'Fully On-Chain', color: 'text-[#FFB84D]', bgColor: 'bg-[#FFB84D]/10' },
    ];

    return (
        <div className="relative py-20 md:py-28 mb-12 overflow-hidden">
            {/* Sui-style Background Effects */}
            <div className="absolute inset-0 -z-10">
                {/* Primary glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-60"
                    style={{
                        background: 'radial-gradient(circle, rgba(77, 162, 255, 0.15) 0%, rgba(0, 212, 255, 0.08) 40%, transparent 70%)',
                        animation: 'blob 20s ease-in-out infinite'
                    }}
                />
                {/* Secondary glow */}
                <div
                    className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 229, 160, 0.2) 0%, transparent 60%)',
                        animation: 'blob 25s ease-in-out infinite reverse'
                    }}
                />
                {/* Tertiary glow */}
                <div
                    className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 60%)',
                        animation: 'blob 30s ease-in-out infinite'
                    }}
                />

                {/* Grid pattern overlay */}
                <div className="sui-grid-pattern" />

                {/* Floating orbs */}
                <div
                    className="absolute top-20 right-1/4 w-2 h-2 rounded-full bg-[#4DA2FF] opacity-60"
                    style={{ animation: 'float 6s ease-in-out infinite' }}
                />
                <div
                    className="absolute bottom-32 left-1/3 w-1.5 h-1.5 rounded-full bg-[#00D4FF] opacity-50"
                    style={{ animation: 'float 8s ease-in-out infinite 1s' }}
                />
                <div
                    className="absolute top-1/3 left-20 w-1 h-1 rounded-full bg-[#00E5A0] opacity-40"
                    style={{ animation: 'float 7s ease-in-out infinite 2s' }}
                />
            </div>

            <div
                className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                {/* Announcement Badge - Centered above everything */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4DA2FF]/10 border border-[#4DA2FF]/20 backdrop-blur-sm">
                        <Sparkles size={14} className="text-[#4DA2FF]" />
                        <span className="text-sm font-medium text-[#4DA2FF]">Powered by Sui Network</span>
                        <ArrowRight size={14} className="text-[#4DA2FF]" />
                    </div>
                </div>

                {/* Logo & Title - Centered below badge */}
                <div className="flex justify-center items-center gap-4 mb-8">
                    <div className="relative group">
                        {/* Animated glow behind logo */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-60 blur-xl"
                            style={{
                                background: 'linear-gradient(135deg, #4DA2FF, #00D4FF, #00E5A0)',
                                animation: 'glow 3s ease-in-out infinite'
                            }}
                        />
                        <div
                            className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #4DA2FF 0%, #00D4FF 50%, #00E5A0 100%)',
                            }}
                        >
                            <Zap size={32} className="text-white md:w-10 md:h-10" fill="currentColor" />
                        </div>
                    </div>
                    <h1 className="hero-title font-display">
                        <span className="gradient-text-animated">Blink</span>
                        <span className="text-foreground">Market</span>
                    </h1>
                </div>

                {/* Tagline */}
                <p className="hero-subtitle text-foreground-secondary mb-4 leading-relaxed max-w-3xl mx-auto">
                    Flash betting for live events.{' '}
                    <span
                        className="font-semibold"
                        style={{
                            background: 'linear-gradient(90deg, #4DA2FF, #00D4FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        10-second markets.
                    </span>{' '}
                    <span className="text-foreground font-semibold">Instant settlement.</span>
                </p>
                <p className="text-base md:text-lg text-foreground-tertiary mb-10 max-w-2xl mx-auto leading-relaxed">
                    Place ultra-fast bets on the next play, next score, or next price movement.
                    Powered by Sui's lightning-fast blockchain for sub-second finality.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.label}
                            className="feature-pill flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-[#4DA2FF]/15 text-sm md:text-base font-medium"
                            style={{
                                background: 'rgba(13, 27, 42, 0.8)',
                                backdropFilter: 'blur(12px)',
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <div className={`p-1.5 rounded-lg ${feature.bgColor}`}>
                                <feature.icon size={18} className={feature.color} />
                            </div>
                            <span className="text-foreground">{feature.label}</span>
                        </div>
                    ))}
                </div>

                {/* Scroll indicator */}
                <div
                    className="mt-16 flex flex-col items-center gap-2 text-foreground-tertiary opacity-60"
                    style={{ animation: 'float 3s ease-in-out infinite' }}
                >
                    <span className="text-xs uppercase tracking-widest">Explore Markets</span>
                    <div className="w-6 h-10 rounded-full border-2 border-current p-1">
                        <div
                            className="w-1.5 h-1.5 rounded-full bg-current mx-auto"
                            style={{ animation: 'slide-down 1.5s ease-in-out infinite' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
