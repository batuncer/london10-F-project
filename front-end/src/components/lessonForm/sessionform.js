import { useState, useEffect } from "react";
import EditableField from "./EditableField";

const module = ["HTML", "CSS", "JS1", "JS2", "JS3", "Node.js", "SQL"];
const location = [1, 2, 3, 4, 5];
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

export default function SessionForm() {
  function submitForm() {
    console.log("Form submitted");
  }

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="formDiv">
      <form onSubmit={submitForm}>
        <label className="form-label">
          {" "}
          Event<br></br>
          <input
            type="text"
            name="event_name"
            value={inputValue}
            defaultValue="Saturday Session"
            onChange={handleInputChange}
            autoFocus
          />
        </label>
        <label className="form-label">
          {" "}
          date, start time, end time, <br></br>
          <EditableField name="Module" type="text" options={module} />
        </label>
        <label className="form-label">
          {" "}
          Location<br></br>
          <EditableField name="location" type="number" options={location} />
        </label>
        <label className="form-label">
          {" "}
          location, city(calendar), description<br></br>
          <EditableField name="lesson_topic" type="text" options={topic} />
        </label>
        <label className="form-label">
          {" "}
          <br></br>
          <EditableField name="syllabus_link" type="text" options={link} />
        </label>
      </form>
      <button type="submit" onClick={submitForm}>
        Create/Update
      </button>
    </div>
  );
}
