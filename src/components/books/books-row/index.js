'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { ExpandedView } from './expanded-view';
import { useSettings } from '@/lib/store/settings-store';

export function BookRow({ book }) {
  const { isRowExpanded, toggleExpandedRow } = useSettings();
  const isExpanded = isRowExpanded(book.id);

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => toggleExpandedRow(book.id)}
      >
        <TableCell>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </TableCell>
        <TableCell>{book.id}</TableCell>
        <TableCell>{book.isbn}</TableCell>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.authors.join(', ')}</TableCell>
        <TableCell>{book.publisher}</TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <ExpandedView book={book} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
