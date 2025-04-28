import { useState } from 'react';
import { Switch } from './ui/switch';
import { CATEGORY_LABELS, PORTION_LABELS } from '../constants/categories';
import { MenuItem } from '../types/menu.type';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Trash } from 'lucide-react';
import { Pencil } from 'lucide-react';
import { Button } from './ui/button';
import { MenuItemDialog } from './MenuItemDialog';

interface MenuItemCardProps {
    item: MenuItem;
    restaurantId: string;
    updateMenuItem: (id: string, updatedItem: any) => Promise<void>;
    onDelete: () => void;
    onAvailabilityChange: (id: string, isAvailable: boolean) => Promise<boolean>;
}

export const MenuItemCard = ({
    item,
    restaurantId,
    updateMenuItem,
    onDelete,
    onAvailabilityChange
}: MenuItemCardProps) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const handleAvailabilityChange = async (isAvailable: boolean) => {
        setIsUpdating(true);
        try {
            const success = await onAvailabilityChange(item.id, isAvailable);
            if (success) {
                console.log(`Item ${item.name} is now ${isAvailable ? 'available' : 'unavailable'}`);
            } else {
                console.error(`Failed to update availability for item ${item.name}`);
            }
        } catch (error) {
            console.error(`Error updating availability for item ${item.name}:`, error);
        } finally {
            setIsUpdating(false);
        }
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleEditSubmit = async (updatedItem: any): Promise<boolean> => {
        try {
            await updateMenuItem(item.id, updatedItem);
            setIsDialogOpen(false);
            return true;
        } catch (error) {
            console.error('Error updating menu item:', error);
            return false;
        }
    };

    return (
        <Card className={`overflow-hidden hover:shadow-lg transition-shadow ${isUpdating ? 'opacity-70' : ''}`}>
            <div className="relative">
                <img
                    src={item.imageUrl || '/placeholder-food.jpg'}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {CATEGORY_LABELS[item.category]}
                </div>
            </div>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{item.name}</span>
                    <span className="text-green-600 font-bold">LKR {item.price.toFixed(2)}</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-muted-foreground">Portion:</span>
                    <span className="font-medium">{PORTION_LABELS[item.portion]}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                    Last updated: {new Date(item.updatedAt).toLocaleString()}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <Switch
                        checked={item.is_available}
                        onCheckedChange={handleAvailabilityChange}
                        disabled={isUpdating}
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                    />
                    <span className={`text-sm ${item.is_available ? 'text-green-600' : 'text-gray-500'}`}>
                        {item.is_available ? 'Available' : 'Unavailable'}
                        {isUpdating && ' (updating...)'}
                    </span>
                </div>
                <div className="flex gap-2">
                    {/* Edit Button */}


                    {/* MenuItemDialog */}
                    <>
                        <MenuItemDialog
                            restaurantId={restaurantId}
                            item={item}
                            onSubmit={handleEditSubmit}
                            onClose={() => setIsDialogOpen(false)}>
                            <Button
                                variant="secondary"
                                size="sm"
                            >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </MenuItemDialog>
                    </>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={onDelete}
                        disabled={isUpdating}
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};