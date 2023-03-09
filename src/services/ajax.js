const baseApiUrl = "https://api.thedogapi.com/v1";

export async function getProducts(limit = 8, page = 0) {
  const response = await fetch(`${baseApiUrl}/breeds?limit=${limit}&page=${page}`);
  if (!response.ok) throw new Error();
  return response.json();
}

export async function getProductDetails(id) {
  const response = await fetch(`${baseApiUrl}/breeds/${id}`);
  if (!response.ok) throw new Error();
  return response.json();
}

export async function getProductImage(imageId) {
  const response = await fetch(`${baseApiUrl}/images/${imageId}`);
  if (!response.ok) throw new Error();
  return response.json();
}

export async function getFilteredProducts(value) {
  const response = await fetch(`${baseApiUrl}/breeds/search?q=${value}`);
  if (!response.ok) throw new Error();
  return response.json();
}
