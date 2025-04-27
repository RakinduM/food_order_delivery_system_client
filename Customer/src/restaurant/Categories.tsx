import React from "react";

interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function Categories({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) {
    
  return (
    <div className="py-4 mb-4">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <button
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === "All"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => onSelectCategory("All")}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
