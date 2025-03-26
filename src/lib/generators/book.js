import { setupFaker } from '@/lib/utils/faker-setup';
import { generateISBN } from '@/lib/generators/isbn';
import { generateReviews } from '@/lib/generators/reviews';

export function generateBook(locale, seed, pageIndex, bookIndex, settings) {
  const uniqueSeed = seed + pageIndex * 1000 + bookIndex;
  const fakerLocalized = setupFaker(locale, uniqueSeed);
  const fakerISBN = setupFaker('en_US', uniqueSeed);

  // Generate localized book titles based on language
  const generateBookTitle = () => {
    const patterns = {
      en_US: [
        () =>
          `The ${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `${fakerLocalized.person.firstName()}'s ${fakerLocalized.word.noun()}`,
        () => fakerLocalized.company.catchPhrase(),
      ],
      de_DE: [
        () =>
          `Das ${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `Die ${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `Der ${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `${fakerLocalized.person.firstName()}s ${fakerLocalized.word.noun()}`,
      ],
      fr_FR: [
        () =>
          `Le ${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `La ${fakerLocalized.word.adjective()} ${fakerLocalized.word.noun()}`,
        () =>
          `Les ${fakerLocalized.word.adjective()}s ${fakerLocalized.word.noun()}`,
        () =>
          `${fakerLocalized.person.firstName()} et ${fakerLocalized.word.noun()}`,
      ],
    };

    const localePatterns = patterns[locale] || patterns.en_US;
    return fakerLocalized.helpers.arrayElement(localePatterns)();
  };

  const authors = Array.from(
    { length: fakerLocalized.number.int({ min: 1, max: 3 }) },
    () => fakerLocalized.person.fullName()
  );

  return {
    id: pageIndex * 20 + bookIndex + 1,
    isbn: generateISBN(fakerISBN),
    title: generateBookTitle(),
    authors,
    publisher: fakerLocalized.company.name(),
    description: fakerLocalized.lorem.paragraph(),
    coverUrl: `https://picsum.photos/seed/${uniqueSeed}/400/600`,
    publishedAt: fakerLocalized.date.past(),
    likes: generateLikes(fakerLocalized, settings.likesPerBook),
    reviews: generateReviews(fakerLocalized, settings.reviewsPerBook),
  };
}

function generateLikes(faker, avgLikesPerBook) {
  // For whole number part, always add that many likes
  const baseNumber = Math.floor(avgLikesPerBook);

  // For fractional part, use it as probability for one more like
  const fractionalPart = avgLikesPerBook - baseNumber;

  // Generate random number between 0 and 1
  const shouldAddExtra = faker.number.float() < fractionalPart;

  // Return base number of likes plus potentially one more
  return baseNumber + (shouldAddExtra ? 1 : 0);
}
