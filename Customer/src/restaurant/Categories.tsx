import React from "react";

interface Category {
  name: string;
  imageUrl: string;
}

interface CategoriesProps {
  categories: Category[];
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
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {/* "All" Category */}
        <button
          className={`flex flex-col items-center px-4 py-2 rounded-lg ${
            selectedCategory === "All"
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
          onClick={() => onSelectCategory("All")}
        >
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="All"
            className="w-16 h-16 rounded-full object-cover mb-2"
          />
          <span className="text-sm font-medium">All</span>
        </button>

        {/* Categories with Images */}
        {categories.map((category) => (
          <button
            key={category.name}
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              selectedCategory === category.name
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-16 h-16 rounded-full object-cover mb-2"
            />
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}