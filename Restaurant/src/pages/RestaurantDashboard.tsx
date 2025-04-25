// pages/RestaurantDashboard.tsx
import { useMenuItems } from '@/hooks/useMenuItems';
import { MenuItemCard } from '@/components/MenuItemCard';
import { MenuItemDialog } from '@/components/MenuItemDialog';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Props {
    restaurantId: string;
}

export default function RestaurantDashboard({ restaurantId }: Props) {
    const {
        menuItems,
        addMenuItem,
        updateMenuItem,
        updateAvailability,
        deleteMenuItem,
        searchTerm,
        setSearchTerm,
        isLoading,
        error,
        retry
    } = useMenuItems(restaurantId);

    // const handleAvailabilityChange = async (id: string, isAvailable: boolean) => {
    //     try {
    //         await updateAvailability(id, isAvailable);
    //     } catch (error) {
    //         console.error('Error updating availability:', error);
    //     }
    // };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <Loader2 className="h-8 w-8 text-green-600 animate-spin mx-auto mb-4" />
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
                    <div className="text-center py-12 text-red-500">
                        <h2 className="text-xl font-medium mb-4">{error}</h2>
                        <Button onClick={retry} className="bg-green-600 hover:bg-green-700">
                            Retry
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h1 className="text-3xl font-bold text-green-600">Restaurant Dashboard</h1>
                        <div className="flex gap-4 w-full sm:w-auto">
                            <SearchBar value={searchTerm} onChange={setSearchTerm} />
                            <MenuItemDialog restaurantId={restaurantId} onSubmit={addMenuItem}>
                                <Button className="bg-green-600 hover:bg-green-700 text-white">
                                    Add New Item
                                </Button>
                            </MenuItemDialog>
                        </div>
                    </div>
                </header>

                {menuItems.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-xl font-medium text-gray-500">No menu items found</h2>
                        <p className="text-gray-400 mt-2">Start by adding your first menu item</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems.map((item) => (
                            <MenuItemCard
                                key={item.id}
                                item={item}
                                onAvailabilityChange={updateAvailability}
                                onEdit={() => (
                                    <MenuItemDialog
                                        restaurantId={restaurantId}
                                        item={item}
                                        onSubmit={async (updatedItem) =>
                                            updateMenuItem(item.id, updatedItem)
                                        }
                                    >
                                        <Button variant="ghost" size="sm">
                                            Edit
                                        </Button>
                                    </MenuItemDialog>
                                )}
                                onDelete={() => {
                                    if (confirm('Are you sure you want to delete this item?')) {
                                        deleteMenuItem(item.id);
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}