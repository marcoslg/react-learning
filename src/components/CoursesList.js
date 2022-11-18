import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CoursesList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Title</td>
          <td>Author ID</td>
          <td>Category</td>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorId}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CoursesList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
// CoursesList.defaultProps = {
//   courses: [],
// };

export default CoursesList;
