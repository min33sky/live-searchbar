import db from '../data/profile.json';

export default async function getPerson(name: string) {
  // Sleep for 1.5 second
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return db.filter((person) =>
    person.name.toLowerCase().startsWith(name.toLowerCase()),
  );
}
