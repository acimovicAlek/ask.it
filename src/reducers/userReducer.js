import jwtDecode from "jwt-decode";
import update from "immutability-helper";

const userReducer = (state = {
  user: undefined,
  topUsers: []
}, action) => {
  switch (action.type) {
    case "USER_LOGIN_FULFILLED":
      const token = action.payload.data.token;
      sessionStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      return Object.assign({}, state, { ...state, user: decoded });
      break;
    case "USER_LOGOUT":
      sessionStorage.removeItem("token");
      return Object.assign({}, state, {
        ...state,
        user: undefined
      });
      break;
    case "SET_CURRENT_USER":
      const user = jwtDecode(action.payload);
      return Object.assign({}, state, { ...state, user });
      break;
    case "GET_TOP_USERS_FULFILLED":
      const topUsers = action.payload.data.topUsers;
      console.log(action.payload.data);
      return Object.assign({}, state, { ...state, topUsers: [...topUsers] });
      break;
    default:
      return state;
      break;
  }
};

export default userReducer;
