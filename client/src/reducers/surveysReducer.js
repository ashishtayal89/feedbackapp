import { FETCH_SURVEYS } from "../actions/types";

export default function(state = [], action) {
  console.log("surveys reducer", action);
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
