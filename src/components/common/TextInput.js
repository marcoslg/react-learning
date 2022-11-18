import React from "react";
import PropTypes from "prop-types";

function TextInput(props) {
  let wrapperClassName = "form-group";
  if (props.error.lenght > 0) {
    wrapperClassName += " has-error";
  }
  return (
    <div className={wrapperClassName}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          name={props.name}
          onChange={props.onChange}
          className="form-control"
          value={props.value}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};
export default TextInput;
