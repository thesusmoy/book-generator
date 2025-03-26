import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettings = create(
  persist(
    (set, get) => ({
      language: 'en_US',
      seed: Math.floor(Math.random() * 10000),
      likesPerBook: 5.0,
      reviewsPerBook: 2.0,
      expandedRows: [],

      setLanguage: (language) => set({ language }),
      setSeed: (value) => {
        const seedValue = parseInt(value) || 0;
        set({ seed: seedValue });
      },
      setLikesPerBook: (value) => set({ likesPerBook: parseFloat(value) || 0 }),
      setReviewsPerBook: (value) =>
        set({ reviewsPerBook: parseFloat(value) || 0 }),
      generateRandomSeed: () => {
        set({ seed: Math.floor(Math.random() * 10000) });
      },

      // Existing row expansion logic
      toggleExpandedRow: (bookId) =>
        set((state) => {
          const expanded = [...state.expandedRows];
          const index = expanded.indexOf(bookId);

          if (index !== -1) {
            expanded.splice(index, 1);
          } else {
            expanded.push(bookId);
          }

          return { expandedRows: expanded };
        }),

      // Add collapse all functionality
      collapseAllRows: () => set({ expandedRows: [] }),

      isRowExpanded: (bookId) => get().expandedRows.includes(bookId),
    }),
    {
      name: 'book-generator-settings',
    }
  )
);
