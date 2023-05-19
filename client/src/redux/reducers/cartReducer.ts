import { SET_CART } from "../../actions/types";
import { unConvert } from "../../utils/unConvert";

export default function cartReducer(state = null, action: { type: any; payload: { items: string | any[]; }; }) {
  switch (action.type) {
    case SET_CART:
      //convert quantities back
      for (let i = 0; i < action.payload.items.length; i++) {
        action.payload.items[i].quantity = unConvert(
          action.payload.items[i].quantity,
          action.payload.items[i].unit
        );
      }
      return action.payload || false;
    default:
      return state;
  }
}
