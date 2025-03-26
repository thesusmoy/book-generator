'use client';

import { LanguageSelect } from './language-select';
import { SeedInput } from './seed-input';
import { LikesSlider } from './likes-slider';
import { ReviewsInput } from './reviews-input';

export function Controls() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <LanguageSelect />
      <SeedInput />
      <LikesSlider />
      <ReviewsInput />
    </div>
  );
}
