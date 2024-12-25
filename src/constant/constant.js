const devUrl = "http://localhost:4000/";
const prodUrl = "https://backend-start-t1yw.onrender.com/";

export const BASE_URL = devUrl;

export const AppRoutes = {
  login: BASE_URL + "auth/login",
  register: BASE_URL + "auth/register",
  getMyInfo: BASE_URL + "user/myInfo",
  getCourses: BASE_URL + "course",
  addCourse: BASE_URL + "course",
};

export default AppRoutes;
