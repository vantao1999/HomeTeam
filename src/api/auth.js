import http from './http';

export async function login(data) {
  return http.post('/auth/login', data);
}

export async function register(data) {
  return http.post('/auth/register', data);
}

export async function forgotPasswordApi(data) {
  return http.post('/auth/forgotPassword', data);
}

export async function resetPasswordApi(data) {
  return http.post('/auth/confirmCode', data);
}

export async function uploadFile(data) {
  return http.postUploadFile('/user/uploadFile', data);
}

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}

export async function updateProfile(data) {
  return http.put('/user/updateProfile', data);
}
//For admin
export async function getMany(data) {
  return http.get('/admin/getMany');
}
export async function createOne(data) {
  return http.post('admin/createOne', data);
}
export async function getOne(userId) {
  return http.get(`/admin/getOne/${userId}`);
}
export async function updateOne(userId, data) {
  return http.put(`/admin/updateOne/${userId}`, data);
}

// export async function userGetInfoApi() {
//   return http.get('/users/me');
// }

// export async function updateUserApi(id, data) {
//   return http.put(`users/${id}`, data);
// }

// export async function createInstallationApi(params) {
//   return http.post('/installations', params);
// }
// export async function userLoginFacebookApi(accessToken) {
//   return http.post(`/auth/loginFacebook/access_token=${accessToken}`);
// }
