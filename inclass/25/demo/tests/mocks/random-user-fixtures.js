export const randomUserApiUrl = 'https://randomuser.me/api/1.4/';

export const randomUserResponse = {
  results: [
    {
      name: {
        first: 'Clarence',
        last: 'James',
      },
      location: {
        city: 'Sunshine Coast',
        country: 'Australia',
      },
      email: 'clarence.james@example.com',
      login: {
        uuid: '2788dcba-54f4-4bc6-9233-a5da11845daa',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/75.jpg',
      },
      nat: 'AU',
    },
    {
      name: {
        first: 'Brayden',
        last: 'Silva',
      },
      location: {
        city: 'Saint Paul',
        country: 'United States',
      },
      email: 'brayden.silva@example.com',
      login: {
        uuid: 'aa3aca4b-d139-4ae7-bd65-1d601cdaf3f2',
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      nat: 'US',
    },
  ],
  info: {
    seed: 'lesson-25',
    results: 2,
    page: 1,
    version: '1.4',
  },
};

export const testUsers = [
  {
    id: '2788dcba-54f4-4bc6-9233-a5da11845daa',
    name: 'Clarence James',
    email: 'clarence.james@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    location: 'Sunshine Coast, Australia',
    about: 'Clarence is a AU contact from Australia.',
  },
  {
    id: 'aa3aca4b-d139-4ae7-bd65-1d601cdaf3f2',
    name: 'Brayden Silva',
    email: 'brayden.silva@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'Saint Paul, United States',
    about: 'Brayden is a US contact from United States.',
  },
];
