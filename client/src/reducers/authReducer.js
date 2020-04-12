import { FETCH_USER, FETCHING_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCHING_USER:
      return { isFetching: true };
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
