'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSettings } from '@/lib/store/settings-store';

export function useInfiniteBooks() {
  const { language, seed, likesPerBook, reviewsPerBook } = useSettings();

  return useInfiniteQuery({
    queryKey: ['books', language, seed, likesPerBook, reviewsPerBook],
    queryFn: async ({ pageParam = 0 }) => {
      const params = new URLSearchParams({
        page: String(pageParam || 0),
        language: language || 'en_US',
        seed: String(seed || 42),
        likesPerBook: String(likesPerBook || 5),
        reviewsPerBook: String(reviewsPerBook || 2),
      });

      const response = await fetch(`/api/books?${params}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    getNextPageParam: (_, pages) => pages.length,
    initialPageParam: 0,
    staleTime: 0,
    cacheTime: 0,
  });
}
