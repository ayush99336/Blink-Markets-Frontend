import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit-react";
import { Hero } from "./components/Hero";
import { StatsBar } from "./components/StatsBar";
import { FlashBetCard } from "./components/FlashBetCard";
import { CategoryTabs } from "./components/CategoryTabs";
import { RecentBets } from "./components/RecentBets";
import { useFlashBets } from "./hooks/useFlashBets";
import { Zap, History, Sparkles, ArrowRight } from "lucide-react";
import { BetCategory } from "./types/bet";

function App() {
  const account = useCurrentAccount();
  const {
    activeBets,
    allActiveBets,
    recentBets,
    placeBet,
    selectedCategory,
    setSelectedCategory
  } = useFlashBets();

  const totalVolume = allActiveBets.reduce((sum, bet) => sum + bet.totalPool, 0) +
    recentBets.reduce((sum, bet) => sum + bet.totalPool, 0);

  const totalParticipants = allActiveBets.reduce((sum, bet) => sum + bet.participants, 0);

  // Count bets per category
  const categoryCounts = allActiveBets.reduce((acc, bet) => {
    acc[bet.category] = (acc[bet.category] || 0) + 1;
    return acc;
  }, {} as Record<BetCategory, number>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 glass-darker">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Zap size={20} className="text-white" fill="currentColor" />
            </div>
            <span className="font-display text-xl font-bold">
              <span className="gradient-text">Blink</span>
              <span className="text-foreground">Market</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#how-it-works"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              How it works
              <ArrowRight size={14} />
            </a>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <Hero />

        {/* Stats Bar */}
        <div className="mb-8">
          <StatsBar
            activeBets={allActiveBets.length}
            totalVolume={totalVolume}
            totalParticipants={totalParticipants}
          />
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <CategoryTabs
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            counts={categoryCounts}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Active Bets - 3 columns on xl screens */}
          <div className="xl:col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2">
                <div className="live-dot" />
                <h2 className="text-xl font-bold text-foreground">Live Markets</h2>
              </div>
              {activeBets.length > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-success-bg text-success text-xs font-semibold">
                  {activeBets.length} active
                </span>
              )}
            </div>

            {activeBets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-border bg-card/30">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <Sparkles className="text-muted-foreground" size={28} />
                </div>
                <p className="text-lg font-medium text-foreground-secondary mb-2">
                  {selectedCategory === 'All' ? 'Waiting for markets...' : `No ${selectedCategory} markets`}
                </p>
                <p className="text-sm text-muted-foreground">
                  New flash markets open every few seconds
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeBets.map((bet) => (
                  <FlashBetCard
                    key={bet.id}
                    bet={bet}
                    onPlaceBet={placeBet}
                    isConnected={!!account}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Recent Results Sidebar */}
          <div className="xl:col-span-1">
            <div className="xl:sticky xl:top-24">
              <div className="flex items-center gap-2 mb-4">
                <History size={20} className="text-muted-foreground" />
                <h2 className="text-lg font-bold text-foreground">Recent Results</h2>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/30 p-4 max-h-[600px] overflow-y-auto">
                <RecentBets bets={recentBets} />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-20 py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-foreground-secondary max-w-xl mx-auto">
              Flash betting made simple. Three steps to place your prediction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Pick Your Side',
                description: 'Choose your prediction for the next live event moment. Will it be Team A or Team B?',
                icon: '🎯',
                gradient: 'from-success/20 to-primary/20',
              },
              {
                step: '02',
                title: 'Bet Fast',
                description: 'You have ~10 seconds before the market closes. Select your amount and confirm instantly.',
                icon: '⚡',
                gradient: 'from-warning/20 to-orange-500/20',
              },
              {
                step: '03',
                title: 'Win Instantly',
                description: 'Results are determined immediately. Winnings are paid out automatically to your wallet.',
                icon: '💰',
                gradient: 'from-info/20 to-purple-500/20',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative group p-6 rounded-2xl bg-card border border-border transition-all hover:border-border-hover hover:bg-card-hover"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center text-xs font-bold text-white shadow-lg">
                  {item.step}
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-4`}>
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-tertiary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 mb-8 py-12 px-8 rounded-3xl bg-gradient-to-br from-primary/10 via-info/5 to-purple-500/10 border border-primary/20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to make your first flash bet?
            </h2>
            <p className="text-foreground-secondary mb-6">
              Connect your Sui wallet and start betting on live events with sub-second finality.
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <Zap size={12} className="text-white" fill="currentColor" />
              </div>
              <span className="font-display font-semibold text-foreground-secondary">
                BlinkMarket
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Built on Sui · Powered by Flash Transactions · Bet Responsibly
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
