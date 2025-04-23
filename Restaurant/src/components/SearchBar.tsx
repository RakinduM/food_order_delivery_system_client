import { Input } from './ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
                type="text"
                placeholder="Search menu items..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full shadow-sm focus-visible:ring-2 focus-visible:ring-green-500"
            />
        </div>
    );
};