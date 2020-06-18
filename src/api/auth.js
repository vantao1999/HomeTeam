import http from './http';

export async function login(data) {
  return http.post('/auth/login', data);
}

export async function register(data) {
  return http.post('/auth/register', data);
}

// export async function userRegisterApi(data) {
//   return http.post('/auth/register', data);
// }

// export async function userLoginApi(data) {
//   return http.post('/auth/loginCustomer', data);
// }

export async function forgotPasswordApi(data) {
  return http.post('/auth/forgotPassword', data);
}

export async function resetPasswordApi(data) {
  return http.post('/auth/confirmCode', data);
}

export async function uploadFile(data) {
  return http.postUploadFile('/user/uploadFile', data);
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
