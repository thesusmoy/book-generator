import { Faker, en, en_US, de, fr } from '@faker-js/faker';

const SUPPORTED_LOCALES = {
  en_US,
  de_DE: de,
  fr_FR: fr,
};

export function setupFaker(locale = 'en_US', seed = 42) {
  const selectedLocale = SUPPORTED_LOCALES[locale] || en_US;

  const faker = new Faker({
    locale: [selectedLocale, en],
  });

  faker.seed(seed);
  return faker;
}
