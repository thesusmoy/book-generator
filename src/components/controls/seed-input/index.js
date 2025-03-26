'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shuffle } from 'lucide-react';
import { useSettings } from '@/lib/store/settings-store';

export function SeedInput() {
  const { seed, setSeed, generateRandomSeed } = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Seed</label>
      <div className="flex gap-2">
        <Input
          type="number"
          value={seed || ''}
          onChange={(e) => setSeed(e.target.value)}
          min={0}
        />
        <Button size="icon" variant="outline" onClick={generateRandomSeed}>
          <Shuffle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
