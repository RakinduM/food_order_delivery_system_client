import { useMenuItems } from '@/hooks/useMenuItems';
import { MenuItemCard } from '@/components/MenuItemCard';
import { AddMenuItemDialog } from '@/components/AddMenuItemDialog';
import { SearchBar } from '@/components/SearchBar';

export default function App() {
    const {
        menuItems,
        addMenuItem,
        updateMenuItem,
        searchTerm,
        setSearchTerm,
        isLoading,
        error
    } = useMenuItems();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-green-600">Restaurant Name</h1>
                            <AddMenuItemDialog onAdd={addMenuItem} disabled />
                        </div>
                        <SearchBar value={searchTerm} onChange={setSearchTerm} disabled />
                    </header>
                    <div className="text-center py-12">
                        <h2 className="text-xl font-medium text-gray-500">Loading menu items...</h2>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-green-600">Restaurant Name</h1>
                            <AddMenuItemDialog onAdd={addMenuItem} />
                        </div>
                        <SearchBar value={searchTerm} onChange={setSearchTerm} />
                    </header>
                    <div className="text-center py-12 text-red-500">
                        <h2 className="text-xl font-medium">{error}</h2>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-green-600">Restaurant Name</h1>
                        <AddMenuItemDialog onAdd={addMenuItem} />
                    </div>
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </header>

                {menuItems.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-medium text-gray-500">No menu items found</h2>
                        <p className="text-gray-400 mt-2">Add your first menu item to get started</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map((item) => (
                            <MenuItemCard
                                key={item.id}
                                item={item}
                                onAvailabilityChange={(id, isAvailable) =>
                                    updateMenuItem(id, { isAvailable })
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}