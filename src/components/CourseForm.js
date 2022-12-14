import React from "react";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input type="hidden" id="id" name="id" value={props.course.id || ""} />
      <input
        type="hidden"
        id="slug"
        name="slug"
        value={props.course.slug || ""}
      />

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
          ...props.authors.map((a) => {
            return { value: a.id, label: a.name };
          }),
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
  authors: PropTypes.array.isRequired,
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
