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
  return http.patch('/auth/updateprofile/phone', data);
}

export async function uploadFile(data) {
  return http.postUploadFile('/user/uploadFile', data);
}

//Set Token before user can updateProfile
export async function setToken(accessToken) {
  return http.setAuthorizationHeader(accessToken);
}
// Get Food
export async function getFoods() {
  return http.get('/foods');
}
export async function getFoodNorth() {
  return http.get('/foods?location=1');
}
export async function getFoodSouth() {
  return http.get('/foods?location=2');
}
export async function getFoodCentral() {
  return http.get('/foods?location=3');
}
//FoodDetails
export async function getFoodDetail(_id) {
  return http.get(`/foods/${_id}`);
}
export async function createOrderApi(data){
  return http.post('/orders/create', data);
}
export async function getOrderApi(){
  return http.get('/orders/getOrder');
}
//Add Foods
export async function addFoodApi (data){
  return http.post('/foods/create',data);
}
