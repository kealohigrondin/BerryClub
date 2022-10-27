import { GET_CURRENT_USER } from "../actions/types";

export default function authReducer(state = null, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload || false; //sets auth to false when action.payload === ''
    default:
      return state;
  }
}
