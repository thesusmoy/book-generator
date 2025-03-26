'use client';

import { Slider } from '@/components/ui/slider';
import { useSettings } from '@/lib/store/settings-store';

export function LikesSlider() {
  const { likesPerBook, setLikesPerBook } = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Likes</label>
      <Slider
        value={[likesPerBook]}
        onValueChange={([value]) => setLikesPerBook(value)}
        max={10}
        step={0.1}
        className="py-4"
      />
      <span className="text-sm text-muted-foreground">
        {likesPerBook.toFixed(1)} likes
      </span>
    </div>
  );
}
