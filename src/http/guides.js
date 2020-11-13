import request, { constructAuthHeader } from "./request";

const BASE_URL = "/guides";

export async function getGuides(token) {
  return await request(BASE_URL, {
    headers: constructAuthHeader(token),
  });
}

// export async function getById(id, token) {
//   return await request(`${BASE_URL}/${id}`, {
//     headers: constructAuthHeader(token),
//   });
// }

// export async function addGuide(token, data) {
//   return await request(BASE_URL, {
//     method: "POST",
//     data,
//     headers: constructAuthHeader(token),
//   });
// }

export async function editGuide(id, token, data) {
  return await request(`${BASE_URL}/${id}`, {
    method: "PUT",
    data,
    headers: constructAuthHeader(token),
  });
}
