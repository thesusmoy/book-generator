import { setupFaker } from '../utils/faker-setup';
import { generateISBN } from './isbn';
import { generateReviews } from './reviews';

export function generateBook(locale, seed, pageIndex, bookIndex, settings) {
  const faker = setupFaker(locale, seed + pageIndex);

  const authors = Array.from(
    { length: faker.number.int({ min: 1, max: 3 }) },
    () => faker.person.fullName()
  );

  return {
    id: pageIndex * 20 + bookIndex + 1,
    isbn: generateISBN(faker),
    title: faker.commerce.productName(),
    authors,
    publisher: faker.company.name(),
    description: faker.commerce.productDescription(),
    coverUrl: `https://picsum.photos/seed/${seed + pageIndex + bookIndex}/400/600`,
    publishedAt: faker.date.past(),
    likes: generateLikes(faker, settings.likesPerBook),
    reviews: generateReviews(faker, settings.reviewsPerBook),
  };
}

function generateLikes(faker, avgLikesPerBook) {
  const baseNumber = Math.floor(avgLikesPerBook);
  const probability = avgLikesPerBook - baseNumber;

  return baseNumber + (faker.number.float() < probability ? 1 : 0);
}
