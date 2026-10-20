
import apiClient from './api';

export async function getDevelopers() {
  const { data } = await apiClient.get('/users');

  return data.map((u, i) => ({
    ...u,
    skills: [
      ['React', 'TypeScript', 'Node.js'],
      ['Python', 'Machine Learning', 'SQL'],
      ['Java', 'Spring Boot', 'Docker'],
      ['UI/UX', 'Figma', 'CSS'],
      ['React', 'Firebase', 'Accessibility'],
      ['Go', 'Cloud', 'Kubernetes'],
      ['JavaScript', 'Vue', 'Testing'],
      ['C++', 'Systems', 'Linux'],
      ['Python', 'Data Engineering', 'AWS'],
      ['PHP', 'Laravel', 'MySQL']
    ][i % 10],
    role: [
      'Frontend Engineer',
      'AI Engineer',
      'Backend Developer',
      'Product Designer',
      'Full Stack Developer'
    ][i % 5],
    availability: i % 3 === 0 ? 'Available' : 'Open to offers'
  }));
}

export async function getDeveloper(id) {
  const { data } = await apiClient.get(`/users/${id}`);
  return data;
}

export async function getPostsByUser(id) {
  const { data } = await apiClient.get(`/posts?userId=${id}`);

  const englishArticles = [
    {
      title: 'How to Build Modern Web Applications',
      body: 'Learn how React, reusable components, and modern development tools help you build responsive and maintainable web applications.'
    },
    {
      title: 'Getting Started with Artificial Intelligence',
      body: 'Discover how AI and machine learning can solve real-world problems and improve modern software applications.'
    },
    {
      title: 'Essential Skills for Software Developers',
      body: 'Strengthen your programming fundamentals, practice problem-solving, learn Git, and build practical projects.'
    },
    {
      title: 'A Beginner’s Guide to Backend Development',
      body: 'Learn about APIs, databases, authentication, and server-side programming to create reliable backend services.'
    },
    {
      title: 'Why Developers Should Learn SQL',
      body: 'Understand how SQL helps developers store, organize, retrieve, and manage data in relational databases.'
    },
    {
      title: 'Writing Clean and Maintainable Code',
      body: 'Improve your code with clear naming, reusable functions, consistent formatting, and well-organized components.'
    }
  ];

  return data.map((post, index) => ({
    ...post,
    title: englishArticles[index % englishArticles.length].title,
    body: englishArticles[index % englishArticles.length].body
  }));
}

export async function createPost(payload) {
  return apiClient.post('/posts', payload);
}

