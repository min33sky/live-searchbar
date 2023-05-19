import db from '../data/profile.json';

export default async function getPeople(name: string): Promise<Profile[]> {
  // Sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return db.filter((person) =>
    person.name.toLowerCase().startsWith(name.toLowerCase()),
  );
}
