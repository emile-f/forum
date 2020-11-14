import { deleteCookie, getCookie, setCookie } from "./cookie.service";
const COOKIE_NAME = "forum-user";
// Should have the following properties
/*
    this.id 
    this.name
    this.created
    this.updated
    this.email
    this.active
*/

const addUser = (user) => {
  Object.assign(currentUser, user);
  setCookie(COOKIE_NAME, JSON.stringify(currentUser), 1);
};

const getUser = () => {
  if (!initialLoad) {
    let cookie = getCookie(COOKIE_NAME);
    if (cookie) {
      try {
        cookie = JSON.parse(cookie);
      } catch (error) {
        console.log("Failed to load cached user");
      }
      addUser(cookie);
    }
    initialLoad = true;
  }
  return currentUser;
};

const signOut = () => {
  Object.assign(currentUser,);
  deleteCookie(COOKIE_NAME);
  window.location.reload(true);
}

let initialLoad = false;
const currentUser = {};

export { currentUser, addUser, getUser, signOut };
