import axios from "axios";
import {env} from "../configs/env";

export function login(credentials) {
  return {
    type: "USER_LOGIN",
    payload: axios(env.NODE_ENV.url + "/users/login", {
      method: "POST",
      data: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    })
  };
}

export function resetPassword(password) {
  return {
    type: "PASSWORD_RESET",
    payload: axios(env.NODE_ENV.url + "/users", {
      method: "PATCH",
      data: JSON.stringify(password),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
  };
}

export function registerUser(credentials) {
  console.log("Credentials log: ", credentials);
  return {
    type: "USER_REGISTER",
    payload: axios(env.NODE_ENV.url + "/users", {
      method: "POST",
      data: credentials,
      headers: {
        "Content-Type": "application/json"
      }
    })
  };
}

export function logout() {
  
    return {
        type: "USER_LOGOUT",
        payload: {}
    };
}

export function setUser(token) {
  
  return {
      type: "SET_CURRENT_USER",
      payload: token
  };
}

export function getTopUsers(){
  return {
      type: "GET_TOP_USERS",
      payload: axios(env.NODE_ENV.url + "/users/top", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
  }
}
