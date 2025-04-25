// components/MenuItemDialog.tsx
import { useState, useRef, useEffect } from 'react';
//import { Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { CATEGORIES, PORTION_SIZES, CATEGORY_LABELS, PORTION_LABELS } from '../constants/categories';
import { MenuItem, MenuItemRequest } from '../types/menu.type';
import { MenuItemCategory, MenuItemPortion } from '../types/menu.type';

interface MenuItemDialogProps {
    restaurantId: string;
    item?: MenuItem;
    onSubmit: (item: MenuItemRequest) => Promise<boolean>;
    children?: React.ReactNode;
}

export const MenuItemDialog = ({
    restaurantId,
    item,
    onSubmit,
    children
}: MenuItemDialogProps) => {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const fileInputRef = useRef<HTMLInputElement>(null);
    //const [previewImage, setPreviewImage] = useState(item?.imageUrl || '');

    const [formData, setFormData] = useState<MenuItemRequest>({
        restaurantId,
        name: item?.name || '',
        description: item?.description || '',
        imageUrl: item?.imageUrl || '',
        price: item?.price || 0,
        portion: item?.portion || 'REGULAR',
        category: item?.category || 'MEALS',
        is_available: item?.is_available ?? true
    });

    useEffect(() => {
        if (item) {
            setFormData({
                restaurantId,
                name: item.name,
                description: item.description,
                imageUrl: item.imageUrl,
                price: item.price,
                portion: item.portion,
                category: item.category,
                is_available: item.is_available
            });
            //setPreviewImage(item.imageUrl);
        }
    }, [item, restaurantId]);

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const result = reader.result as string;
    //             setPreviewImage(result);
    //             setFormData(prev => ({ ...prev, imageUrl: result }));
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const success = await onSubmit(formData);
        if (success) {
            setOpen(false);
            if (!item) {
                setFormData({
                    restaurantId,
                    name: '',
                    description: '',
                    imageUrl: '',
                    price: 0,
                    portion: 'REGULAR',
                    category: 'MEALS',
                    is_available: true
                });
                // setPreviewImage('');
                // if (fileInputRef.current) {
                //     fileInputRef.current.value = '';
                // }
            }
        }
        setIsSubmitting(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{item ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageUrl" className="text-right">
                            Image
                        </Label>
                        <Input
                            id="image"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            className="col-span-3"
                            required
                        />
                    </div>

                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">
                            Image
                        </Label>
                        <div className="col-span-3 space-y-2">
                            <input
                                ref={fileInputRef}
                                id="image"
                                type="text" // This is a workaround to allow file input
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                title="Upload an image for the menu item"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Image
                            </Button>
                            {previewImage && (
                                <div className="mt-2">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="h-32 w-32 object-cover rounded-md border"
                                    />
                                </div>
                            )}
                        </div>
                    </div> */}

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">
                            Price (LKR)
                        </Label>
                        <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            className="col-span-3"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="portion" className="text-right">
                            Portion Size
                        </Label>
                        <Select
                            value={formData.portion}
                            onValueChange={(value) => setFormData({ ...formData, portion: value as MenuItemPortion })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select portion size" />
                            </SelectTrigger>
                            <SelectContent>
                                {PORTION_SIZES.map((size) => (
                                    <SelectItem key={size} value={size}>
                                        {PORTION_LABELS[size]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Select
                            value={formData.category}
                            onValueChange={(value) => setFormData({ ...formData, category: value as MenuItemCategory })}
                        >
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {CATEGORY_LABELS[category]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="isAvailable" className="text-right">
                            Available
                        </Label>
                        <Switch
                            id="isAvailable"
                            checked={formData.is_available}
                            onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                            className="col-span-3"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};