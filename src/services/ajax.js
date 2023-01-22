// export async function getPosts(limit = 8, page = 0) {
//   try {
//     const response = await fetch(
//       `https://api.thedogapi.com/v1/brees?limit=${limit}&page=${page}`
//     );
//     if (!response.ok) throw new Error('Error 404');
//     return response;
//   } catch (er) {
//     console.log('catch is work');
//   }
// }

export async function getPosts(limit = 8, page = 0) {
  const response = await fetch(
    `https://api.thedogapi.com/v1/breeds?limit=${limit}&page=${page}`
  );
  return response;
}
