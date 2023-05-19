import db from '../data/profile.json';

export default async function getPerson(
  name: string,
): Promise<Profile | undefined> {
  // Sleep for 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return db.find((person) => person.name.toLowerCase() === name.toLowerCase());
}
