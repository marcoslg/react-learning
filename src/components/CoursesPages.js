import React, { useState, useEffect } from "react";
//import { getCourses } from "../api/courseApi";
import CoursesList from "./CoursesList";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorsStore";
import { loadCourses, removeCourses } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorsActions";

function CoursesPages() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.get());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.isEmpty()) {
      loadCourses();
    }
    //removeChangeLister when coursesPages is unamount, It's say, when we navigate to the other page
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  useEffect(() => {
    authorStore.addChangeListener(onChangeAuthors);
    if (authorStore.isEmpty()) {
      loadAuthors();
    }
    //removeChangeLister when coursesPages is unamount, It's say, when we navigate to the other page
    return () => authorStore.removeChangeListener(onChangeAuthors);
  }, [authors]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  function findAuthor(id) {
    const _author = authors.find((a) => a.id === id);
    if (_author) {
      return _author.name;
    }
  }
  function onChangeAuthors() {
    setAuthors(authorStore.get());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CoursesList
        courses={courses}
        onRemove={removeCourses}
        findAuthor={findAuthor}
      />
    </>
  );
}

export default CoursesPages;
