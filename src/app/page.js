import { Card, CardContent } from '@/components/ui/card';
import { Controls } from '@/components/controls';
import { BooksTable } from '@/components/books/book-table';

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="fixed px-8 lg:px-4 top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto">
          <Card className="my-6">
            <CardContent className="p-6">
              <Controls />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container px-8 lg:px-4 mx-auto mt-[28rem] md:my-[17rem] lg:!my-[11.7rem]">
        <Card className="w-full">
          <CardContent className="p-6">
            <BooksTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
