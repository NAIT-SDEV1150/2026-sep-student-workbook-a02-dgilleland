const RANDOM_USER_API_URL = 'https://randomuser.me/api/1.4/';
const RANDOM_USER_FIELDS = ['name', 'location', 'email', 'login', 'picture', 'nat'];

export function mapRandomUser(randomUser) {
  return {
    id: randomUser.login.uuid,
    name: `${randomUser.name.first} ${randomUser.name.last}`,
    email: randomUser.email,
    avatar: randomUser.picture.large,
    location: `${randomUser.location.city}, ${randomUser.location.country}`,
    about: `${randomUser.name.first} is a ${randomUser.nat} contact from ${randomUser.location.country}.`,
  };
}

export async function fetchUserProfiles(count = 2) {
  const url = new URL(RANDOM_USER_API_URL);
  url.searchParams.set('results', String(count));
  url.searchParams.set('inc', RANDOM_USER_FIELDS.join(','));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not load random users.');
  }

  const data = await response.json();
  return data.results.map(mapRandomUser);
}
