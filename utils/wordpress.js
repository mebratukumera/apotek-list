//  /utils/wordpress.js

const BASE_URL = 'http://localhost:3005/wp-json/wp/v2';

// Return the pages
export async function getPages() {
  const pages = await fetch(BASE_URL + '/pages')
    .then(response => response.json())

    .then(pages => {
      return pages
    })
  console.log(pages);
  return pages
}
// return the posts
export async function getPosts() {
  const postsRes = await fetch(BASE_URL + '/posts?_embed');
  const posts = await postsRes.json();
  return posts;
}

// Return single post
export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter(post => post.slug == slug)
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}

// Return all Jobs
export async function getJobs() {
  const jobsRes = await fetch(BASE_URL + '/jobs');
  const jobs = await jobsRes.json();
  return jobs;
}

// Return Single Job
export async function getJob(slug) {
  const jobs = await getJobs();
  const jobArray = jobs.filter(job => job.slug == slug);
  const job = jobArray.length > 0 ? jobArray[0] : null;
  return job;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case 'posts':
      elements = await getPosts();
      break;
    case 'jobs':
      elements = await getJobs();
      break;
  }
  const elementsIds = elements.map(element => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });

  return elementsIds;
}