import { Switch } from './ui/switch';
import { CATEGORY_LABELS, PORTION_LABELS } from '../constants/categories';
import { MenuItem } from '../types/menu.type';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';

interface MenuItemCardProps {
    item: MenuItem;
    onAvailabilityChange: (id: string, isAvailable: boolean) => void;
}

export const MenuItemCard = ({ item, onAvailabilityChange }: MenuItemCardProps) => {
    return (
        <Card className={`overflow-hidden transition-all ${item.isAvailable ? 'border-green-100' : 'border-gray-200'}`}>
            <div className="relative">
                <img
                    src={item.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                    {CATEGORY_LABELS[item.category]}
                </div>
            </div>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{item.name}</span>
                    <span className="text-green-600 font-bold">{item.price.toFixed(2)} LKR</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Portion:</span>
                    <span className="text-sm font-medium">{PORTION_LABELS[item.portion]}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className={`text-sm font-medium ${item.isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                </div>
                <Switch
                    checked={item.isAvailable}
                    onCheckedChange={(checked) => onAvailabilityChange(item.id, checked)}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
                />
            </CardFooter>
        </Card>
    );
};