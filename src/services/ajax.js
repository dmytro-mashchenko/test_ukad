export async function getPosts(limit = 8, page = 0) {
  const response = await fetch(
    `https://api.thedogapi.com/v1/breeds?limit=${limit}&page=${page}`
  );
  return response;
}
