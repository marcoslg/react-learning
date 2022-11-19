import dispatcher from "../addDispatcher";
import * as authorsAPI from "../api/authorApi";
import actionTypes from "./actionTypes";

export function loadAuthors() {
  return authorsAPI.getAuthors().then((authors) => {
    dispatcher.dispatch({
      actionType: actionTypes.COURSE_AUTHORS_LOAD,
      authors: authors,
    });
  });
}
