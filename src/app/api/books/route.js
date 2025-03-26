import { NextResponse } from 'next/server';
import { generateBook } from '../../../lib/generators/book';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0');
    const language = searchParams.get('language') || 'en_US';
    const seed = parseInt(searchParams.get('seed') || '42');
    const likesPerBook = parseFloat(searchParams.get('likesPerBook') || '5');
    const reviewsPerBook = parseFloat(
      searchParams.get('reviewsPerBook') || '2'
    );

    const settings = {
      language,
      seed,
      likesPerBook,
      reviewsPerBook,
    };

    const books = Array.from({ length: 20 }, (_, index) =>
      generateBook(language, seed, page, index, settings)
    );

    return NextResponse.json({ books }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to generate books',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
