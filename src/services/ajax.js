export async function getPosts(limit = 8, page = 0) {
  const response = await fetch(
    `https://api.thedogapi.com/v1/breeds?limit=${limit}&page=${page}`
  );
  if (!response.ok) throw new Error('There is an error');
  return response.json();
}

export async function getProductDetails(id) {
  const response = await fetch(`https://api.thedogapi.com/v1/breeds/${id}`);
  if (!response.ok) throw new Error('There is an error');
  return response.json();
}

export async function getProductImage(imageId) {
  const response = await fetch(
    `https://api.thedogapi.com/v1/images/${imageId}`
  );
  if (!response.ok) throw new Error('There is an error');
  return response.json();
}
