import http from './http';

export async function login(data) {
  return http.post('/auth/login', data);
}
//For Users
export async function register(data) {
  return http.post('/auth/signup', data);
}
export async function houseRegisterApi(data) {
  return http.post('/housewifes/signup', data);
}
export async function forgotPasswordApi(data) {
  return http.post('/housewifes/forgotpassword/phone', data);
}

export async function resetPasswordApi(data) {
  return http.post('/housewifes/changepassword/phone', data);
}

export async function updateProfile(data) {
  return http.put('/user/updateProfile', data);
}

export async function uploadFile(data) {
  return http.postUploadFile('/user/uploadFile', data);
}

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}
// Get Food
export async function getFoods(data) {
  return http.get('/foods');
}
export async function getFoodDetail(_id) {
  return http.get(`/foods/${_id}`);
}
export async function createOne(data) {
  return http.post('admin/createOne', data);
}
export async function updateOne(userId, data) {
  return http.put(`/admin/updateOne/${userId}`, data);
}
export async function disable(userId, data) {
  return http.put(`/admin/disable/${userId}`, data);
}
//Get Me
export async function getMe() {
  return http.get('/auth/me');
}