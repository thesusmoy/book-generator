'use client';

import { StarIcon, ThumbsUp } from 'lucide-react'; // Add ThumbsUp import
import Image from 'next/image';

export function ExpandedView({ book }) {
  return (
    <div className="py-4">
      <div className="flex gap-6">
        <div className="relative h-[300px] w-[200px] overflow-hidden rounded-md">
          <Image
            src={book.coverUrl}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 200px) 100vw, 200px"
            priority={false}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
          <p className="text-muted-foreground mb-4">{book.description}</p>

          {/* Add likes count */}
          <div className="flex items-center gap-2 mb-4">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {book.likes} likes
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Reviews</h4>
            {book.reviews.map((review, index) => (
              <div key={index} className="border-l-2 pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{review.author}</span>
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4 fill-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
