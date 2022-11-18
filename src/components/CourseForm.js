import React from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        name="title"
        error={props.errors.title}
        onChange={props.onChange}
        value={props.course.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        error={props.errors.authorId}
        onChange={props.onChange}
        value={props.course.authorId || ""}
        options={[
          { value: "", label: "" },
          { value: "1", label: "Cory House" },
          { value: "2", label: "Scott Allen" },
        ]}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        error={props.errors.category}
        onChange={props.onChange}
        value={props.course.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.shape({
    authorId: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  errors: PropTypes.shape({
    authorId: PropTypes.any,
    category: PropTypes.any,
    title: PropTypes.any,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
// CourseForm.propTypes = {
//   course: PropTypes.shape({
//     id: PropTypes.string,
//     title: PropTypes.string,
//     authorId: PropTypes.string,
//     category: PropTypes.string,
//   }).isRequired,
//   errors: PropTypes.object.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// };
export default CourseForm;
