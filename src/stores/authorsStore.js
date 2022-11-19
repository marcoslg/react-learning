import dispatcher from "../addDispatcher";
import { EventEmitter } from "events";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";

let _authors = [];

class AuthorsStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isEmpty() {
    return _authors.length === 0;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  get() {
    return _authors;
  }

  getById(id) {
    return _authors.find((c) => c.id === id);
  }
}

const store = new AuthorsStore();
dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.COURSE_AUTHORS_LOAD:
      _authors = action.authors;
      store.emitChange();
      break;
    default:
  }
});
export default store;
