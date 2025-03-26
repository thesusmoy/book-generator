export function generateReviews(faker, avgReviewsPerBook) {
  const baseCount = Math.floor(avgReviewsPerBook);
  const probability = avgReviewsPerBook - baseCount;
  const actualCount = baseCount + (faker.number.float() < probability ? 1 : 0);

  return Array.from({ length: actualCount }, () => ({
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
  }));
}
