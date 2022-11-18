import React from "react";
import { getCourses } from "../api/courseApi";
class CoursesPages extends React.Component {
  state = {
    courses: [],
  };
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //       courses: [],
  //     };
  //   }

  componentDidMount() {
    getCourses().then((courses) => this.setState({ courses: courses }));
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <table className="table">
          <thead>
            <tr>
              <td>Title</td>
              <td>Author ID</td>
              <td>Category</td>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default CoursesPages;
