import { BetCategory, CATEGORIES } from '../types/bet';
import { cn } from '../lib/utils';

interface CategoryTabsProps {
    selected: BetCategory;
    onSelect: (category: BetCategory) => void;
    counts: Record<BetCategory, number>;
}

export function CategoryTabs({ selected, onSelect, counts }: CategoryTabsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
                const isActive = selected === category.id;
                const count = category.id === 'All'
                    ? Object.values(counts).reduce((a, b) => a + b, 0)
                    : counts[category.id] || 0;

                return (
                    <button
                        key={category.id}
                        onClick={() => onSelect(category.id)}
                        className={cn(
                            'category-pill flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all',
                            isActive
                                ? cn(category.color, 'active')
                                : 'bg-secondary/50 border-border text-foreground-secondary hover:bg-secondary hover:border-border-hover'
                        )}
                    >
                        <span>{category.icon}</span>
                        <span>{category.label}</span>
                        {count > 0 && (
                            <span className={cn(
                                'ml-1 px-1.5 py-0.5 rounded-md text-xs font-bold',
                                isActive ? 'bg-white/20' : 'bg-muted'
                            )}>
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
