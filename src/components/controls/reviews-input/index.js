'use client';

import { Input } from '@/components/ui/input';
import { useSettings } from '@/lib/store/settings-store';

export function ReviewsInput() {
  const { reviewsPerBook, setReviewsPerBook } = useSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Review</label>
      <Input
        type="number"
        value={reviewsPerBook}
        onChange={(e) => setReviewsPerBook(e.target.value)}
        step={0.1}
        min={0}
        max={10}
      />
    </div>
  );
}
