import dispatcher from "../addDispatcher";
import * as courseAPI from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseAPI.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.COURSE_UPDATE
        : actionTypes.COURSE_CREATE,
      course: savedCourse,
    });
  });
}

export function loadCourses() {
  return courseAPI.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionTypes.COURSE_LOAD,
      courses: courses,
    });
  });
}

export function removeCourses(course) {
  return courseAPI.deleteCourse(course.id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.COURSE_DELETE,
      course: course,
    });
  });
}
