import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseAPI from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseAPI.getCourseBySlug(slug).then((_course) => setCourse(_course));
    }
  }, [props.match.params.slug]);

  const [hasUnsaved, sethasUnsaved] = useState(false);
  const [errors, setErrors] = useState({});

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
    courseAPI
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
      />
    </>
  );
};

export default ManageCoursePage;
