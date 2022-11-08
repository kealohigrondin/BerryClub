import { GET_CART } from "../actions/types";

export default function cartReducer(state = null, action) {
  switch (action.type) {
    case GET_CART:
      return action.payload || false;
    default:
      return state;
  }
}
