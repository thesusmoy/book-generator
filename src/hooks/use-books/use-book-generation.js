import { useCallback } from 'react';
import { useSettings } from '@/lib/store/settings-store';
import { generateBook } from '@/lib/generators/book';

export function useBookGeneration() {
  const { language, seed, likesPerBook, reviewsPerBook } = useSettings();

  const generateBooksPage = useCallback(
    (pageIndex) => {
      const settings = { likesPerBook, reviewsPerBook };

      return Array.from({ length: 20 }, (_, index) =>
        generateBook(language, seed, pageIndex, index, settings)
      );
    },
    [language, seed, likesPerBook, reviewsPerBook]
  );

  return { generateBooksPage };
}
