import faker from '@faker-js/faker';
import { addDays, setHours, subDays } from 'date-fns';
import { Colors } from 'react-native-paper';

const TOPICS = [
  { id: 1, title: 'Finance', icon: 'wallet-outline', color: Colors.green700 },
  {
    id: 2,
    title: 'Business',
    icon: 'business-outline',
    color: Colors.lightBlue700,
  },
  {
    id: 3,
    title: 'Education',
    icon: 'school-outline',
    color: Colors.orange700,
  },
  { id: 4, title: 'Health', icon: 'medical-outline', color: Colors.teal700 },
  { id: 5, title: 'Sports', icon: 'football-outline', color: Colors.yellow700 },
  {
    id: 6,
    title: 'Hobby',
    icon: 'game-controller-outline',
    color: Colors.red700,
  },
  { id: 7, title: 'Travel', icon: 'airplane-outline', color: Colors.indigo700 },
];

const EXPERTS = [...Array(10)].map((u, i) => ({
  id: i,
  name: faker.name.findName(),
  title: faker.name.title(),
  jobTitle: faker.name.jobTitle(),
  jobType: faker.name.jobType(),
  avatar: faker.image.avatar(),
  reviews: faker.datatype.number(),
  expertise: faker.random.arrayElement(TOPICS).title,
}));

const SENTENCES = [...Array(10)].map((u, i) => ({
  id: i,
  text: faker.lorem.sentence(),
}));

const EXPERT = {
  id: 1,
  image:
    'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80',
  name: faker.name.findName('male'),
  title: faker.name.title(),
  jobTitle: faker.name.jobTitle(),
  jobType: faker.name.jobType(),
  avatar: faker.image.avatar(),
  reviews: faker.datatype.number(),
  expertise: TOPICS[1].title,
  experience: 10,
  rating: 4.9,
  description: faker.lorem.sentences(),
  tags: [
    'finance',
    'business',
    'education',
    'health',
    'sports',
    'hobby',
    'travel',
  ],
};

const AVAILABILITY = [
  { day: 'mon', open: '08:00', close: '18:00', isClosed: false },
  { day: 'tue', open: '08:00', close: '18:00', isClosed: false },
  { day: 'wed', open: '08:00', close: '18:00', isClosed: false },
  { day: 'thu', open: '08:00', close: '18:00', isClosed: false },
  { day: 'fri', open: '08:00', close: '18:00', isClosed: false },
  { day: 'sat', open: '08:00', close: '18:00', isClosed: true },
  { day: 'sun', open: '08:00', close: '18:00', isClosed: true },
];

const APPOINTMENTS = {
  upcoming: {
    id: 1,
    name: faker.name.findName(),
    topic: faker.random.arrayElement(TOPICS).title,
    avatar: faker.image.avatar(),
    date: setHours(addDays(new Date(), 1), 9),
  },
  past: [...Array(5)].map((u, i) => ({
    id: i,
    name: faker.name.findName(),
    topic: faker.random.arrayElement(TOPICS).title,
    avatar: faker.image.avatar(),
    date: subDays(setHours(new Date(), 9), i * 2),
  })),
};

export { EXPERTS, EXPERT, TOPICS, SENTENCES, AVAILABILITY, APPOINTMENTS };
