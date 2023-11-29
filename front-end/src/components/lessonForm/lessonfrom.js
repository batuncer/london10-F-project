import { useState, useEffect } from "react";
import EditableField from "./EditableField";

const module_no = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const module = ["HTML", "CSS", "JS1", "JS2", "JS3", "Node.js", "SQL"];
const week_no = [1, 2, 3, 4, 5];
const topic = ["HTML", "CSS", "JS1", "JS2", "JS3", "Node.js", "SQL"];
const link = [
  "HTML_link",
  "CSS_link",
  "JS1_link",
  "JS2_link",
  "JS3_link",
  "Node.js_link",
  "SQL_link",
];

export default function LessonForm() {
  function submitForm() {
    console.log("Form submitted");
  }

  return (
    <div className="formDiv">
      <form onSubmit={submitForm}>
        <label className="form-label">
          {" "}
          Module №<br></br>
          <EditableField name="module_no" type="number" options={module_no} />
        </label>
        <label className="form-label">
          {" "}
          Module<br></br>
          <EditableField name="Module" type="text" options={module} />
        </label>
        <label className="form-label">
          {" "}
          Week №<br></br>
          <EditableField name="week_no" type="number" options={week_no} />
        </label>
        <label className="form-label">
          {" "}
          Lesson Topic<br></br>
          <EditableField name="lesson_topic" type="text" options={topic} />
        </label>
        <label className="form-label">
          {" "}
          Syllabus Link<br></br>
          <EditableField name="syllabus_link" type="text" options={link} />
        </label>
      </form>
      <button type="submit" onClick={submitForm}>
        Create/Update
      </button>
    </div>
  );
}
