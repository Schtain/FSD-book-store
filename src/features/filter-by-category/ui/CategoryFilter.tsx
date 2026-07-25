

interface CategoryFilterProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
}

export const CategoryFilter = ({activeCategory, onCategoryChange, categories}:CategoryFilterProps) => {
    const allCategories = ['All', ...categories];


    return (
        <div className="h-15  flex gap-2 overflow-x-auto no-scrollbar pb-2 md:flex-wrap">
            {allCategories.map((category) => {
                const isActive = activeCategory === category;

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={
                            `px-4 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors border ${isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-card-foreground border-border hover:bg-muted'}`
                        }
                    
                    >{category === 'All' ? 'Все жанры' : category }</button>
                )
            })}
        </div>
    )
}