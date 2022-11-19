import dispatcher from "../addDispatcher";
import { EventEmitter } from "events";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";

let _courses = [];

class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  isEmpty() {
    return _courses.length === 0;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  getCourses() {
    return _courses;
  }

  getCoursesBySlug(slug) {
    return _courses.find((c) => c.slug === slug);
  }
}

const store = new CourseStore();
dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.COURSE_CREATE:
      _courses.push(action.course);
      store.emitChange();
      break;
    case actionTypes.COURSE_LOAD:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.COURSE_UPDATE:
      _courses = _courses.map((c) =>
        c.id === action.course.id ? action.course : c
      );

      store.emitChange();
      break;
    case actionTypes.COURSE_DELETE:
      _courses = _courses.filter(
        (c) => c.id !== parseInt(action.course.id, 10)
      );
      store.emitChange();
      break;
    default:
  }
});
export default store;
