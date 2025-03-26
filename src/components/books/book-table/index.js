'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteBooks } from '@/hooks/use-books/use-infinite-books';
import { useSettings } from '@/lib/store/settings-store';
import { BookRow } from '../books-row';
import { Button } from '@/components/ui/button';
import { ChevronDownSquare } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const COLUMNS = ['#', 'ISBN', 'Title', 'Author(s)', 'Publisher'];

export function BooksTable() {
  const { ref: bottomRef, inView } = useInView();
  const { collapseAllRows } = useSettings();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteBooks();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading books: {error.message}
      </div>
    );
  }

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={collapseAllRows}
                className="h-8 p-0 text-muted-foreground hover:bg-transparent"
              >
                <ChevronDownSquare className="h-4 w-4" />
                <span className="sr-only">Collapse All</span>
              </Button>
            </TableHead>
            {COLUMNS.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages.map((page) =>
            page.books.map((book) => <BookRow key={book.id} book={book} />)
          )}
          {(isLoading || isFetchingNextPage) && (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="h-24 animate-pulse">
                  <TableCell className="w-[50px]" />
                  {COLUMNS.map((_, j) => (
                    <TableCell key={j}>
                      <div className="h-4 w-full rounded bg-muted"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
