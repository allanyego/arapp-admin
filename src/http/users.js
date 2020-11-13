import request, { constructAuthHeader } from "./request";

const BASE_URL = "/users";

export async function getUsers(
  token,
  { username = null, user = false, unset = false } = {}
) {
  let queryParams = "";
  if (username && user) {
    queryParams += `?username=${encodeURIComponent(username)}&user=true`;
  } else if (username) {
    queryParams +=
      `?username=${encodeURIComponent(username)}` + unset ? "&unset=true" : "";
  } else if (user) {
    queryParams += `?user=true`;
  } else if (unset) {
    queryParams += "?unset=true";
  }

  return await request(`${BASE_URL + queryParams}`, {
    headers: constructAuthHeader(token),
  });
}

export async function signIn(username, password) {
  return await request(`${BASE_URL}/signin`, {
    method: "POST",
    data: {
      username,
      password,
    },
  });
}

export async function signUp(userData) {
  return await request(BASE_URL, {
    method: "POST",
    data: userData,
  });
}

export async function editUser(userId, token, data, multiPart = false) {
  return await request(`${BASE_URL}/${userId}`, {
    method: "PUT",
    data,
    headers: constructAuthHeader(token),
    multiPart,
  });
}

export async function getById(userId, token) {
  return await request(`${BASE_URL}/${userId}`, {
    headers: constructAuthHeader(token),
  });
}
