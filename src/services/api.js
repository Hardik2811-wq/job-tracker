import axios from 'axios';
import { generateId } from '../utils/helpers';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

const COMPANIES = [
  { name: 'Google', domain: 'google.com', location: 'Remote', platform: 'LinkedIn' },
  { name: 'Microsoft', domain: 'microsoft.com', location: 'Hybrid', platform: 'Company Website' },
  { name: 'Amazon', domain: 'amazon.com', location: 'On-site', platform: 'LinkedIn' },
  { name: 'Stripe', domain: 'stripe.com', location: 'Remote', platform: 'Wellfound' },
  { name: 'Figma', domain: 'figma.com', location: 'Remote', platform: 'LinkedIn' },
  { name: 'Notion', domain: 'notion.so', location: 'Hybrid', platform: 'Company Website' },
  { name: 'Atlassian', domain: 'atlassian.com', location: 'Remote', platform: 'Naukri' },
  { name: 'Salesforce', domain: 'salesforce.com', location: 'On-site', platform: 'LinkedIn' },
];

const STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

const getRoles = (productTitle) => {
  const roles = [
    'Frontend Developer', 'Backend Developer', 'Full Stack Engineer',
    'Software Engineer', 'React Developer', 'Node.js Developer',
    'UI/UX Engineer', 'DevOps Engineer',
  ];
  return roles[Math.floor(Math.random() * roles.length)];
};

export const getLogoUrl = (domain) =>
  `https://logo.clearbit.com/${domain}`;

export const fetchMockJobs = async () => {
  const response = await axiosInstance.get('/products?limit=8');
  const products = response.data.products;

  return products.map((product, index) => {
    const company = COMPANIES[index % COMPANIES.length];
    const appliedDate = new Date();
    appliedDate.setDate(appliedDate.getDate() - Math.floor(Math.random() * 60));
    const interviewDate = new Date(appliedDate);
    interviewDate.setDate(interviewDate.getDate() + Math.floor(Math.random() * 14) + 3);
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];

    return {
      id: generateId(),
      company: company.name,
      domain: company.domain,
      role: getRoles(product.title),
      location: company.location,
      salary: Math.floor((product.price * 1000) / 12) * 12,
      platform: company.platform,
      status,
      appliedDate: appliedDate.toISOString().split('T')[0],
      interviewDate: status !== 'Applied' ? interviewDate.toISOString().split('T')[0] : '',
      notes: `Applied via ${company.platform}. ${product.description.substring(0, 60)}...`,
      bookmarked: false,
    };
  });
};
