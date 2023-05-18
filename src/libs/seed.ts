import { mkdirSync, writeFileSync } from 'fs';
import { faker } from '@faker-js/faker';
import { resolve } from 'path';

function init() {
  console.log('Seed start...');

  //* create array with 50 object
  const profile = Array.from({ length: 50 }, () => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
  }));

  //* Create folder if not exist
  mkdirSync(resolve(process.cwd(), 'src/data'), { recursive: true });

  //* Write file
  writeFileSync(
    resolve(process.cwd(), 'src/data/profile.json'),
    JSON.stringify(profile),
  );

  console.log('Seed success...');
}

init();
