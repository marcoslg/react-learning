import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
//import * as courseAPI from "../api/courseApi";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { loadAuthors } from "../actions/authorsActions";
import authorsStore from "../stores/authorsStore";

import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  const [hasUnsaved, sethasUnsaved] = useState(false);
  const [isEmpty, setIsEmpty] = useState(courseStore.isEmpty());
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorsStore.get());

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    if (isEmpty) {
      courseActions.loadCourses();
    } else {
      onChange();
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [props.match.params.slug]);

  useEffect(() => {
    authorsStore.addChangeListener(onLoadAuthors);

    if (isEmpty) {
      loadAuthors();
    }
    return () => authorsStore.removeChangeListener(onLoadAuthors);
  }, [authors]);

  function onChange() {
    setIsEmpty(courseStore.isEmpty());
    const slug = props.match.params.slug;
    if (slug) {
      var _course = courseStore.getCoursesBySlug(slug);
      if (_course) {
        setCourse(_course);
      } else {
        props.history.push("/notfound");
      }
    }
  }

  function onLoadAuthors() {
    const _authors = authorsStore.get();
    setAuthors(_authors);
  }

  function handleTitle(event) {
    const updatedCource = { ...course, title: event.target.value };
    setCourse(updatedCource);
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
    sethasUnsaved(true);
  }

  function formIsValid() {
    const _errors = {};
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";
    if (!course.title) _errors.title = "title is required";
    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions
      .saveCourse(course)
      .then(() => {
        sethasUnsaved(false);
        props.history.push("/courses");
        toast.success("Course saved!");
      })
      .catch((ex) => {
        debugger;
        toast.error(ex.message);
      });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <Prompt when={hasUnsaved} message="Are you sure you want to leave?" />
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
        authors={authors}
      />
    </>
  );
};

export default ManageCoursePage;
