'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSettings } from '@/lib/store/settings-store';

const LANGUAGES = [
  { value: 'en_US', label: 'English (US)' },
  { value: 'de_DE', label: 'German' },
  { value: 'fr_FR', label: 'French' },
];

export function LanguageSelect() {
  const { language, setLanguage } = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Language</label>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
