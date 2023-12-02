import { useState, useEffect } from "react";
import EditableField from "./EditableField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const module = ["HTML", "CSS", "JS1", "JS2", "JS3", "Node.js", "SQL"];
const location = [1, 2, 3, 4, 5];
const city = ["London", "Glasgow", "Manchester"];
const lesson = [
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="formDiv">
      <form onSubmit={submitForm}>
        <h2>Calendar Event</h2>
        <label className="form-label">
          {" "}
          Event<br></br>
          <div className="input-line">
            <input
              type="text"
              name="event_name"
              value={inputValue}
              defaultValue="Saturday Session"
              onChange={handleInputChange}
              autoFocus
            />
          </div>
        </label>
        <label className="form-label">
          Date
          <br />
          <div className="input-line">
            <label>Start:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="d MMM, h:mm aa"
              className="timepicker"
            />
            <label>End:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              dateFormat="d MMM, h:mm aa"
              className="timepicker"
            />
          </div>
        </label>
        <label className="form-label">
          {" "}
          Location<br></br>
          <EditableField name="location" type="text" options={location} />
        </label>
        <label className="form-label">
          {" "}
          City(calendar)<br></br>
          <EditableField name="city" type="text" options={city} />
        </label>
        <label className="form-label">
          {" "}
          Description
          <br></br>
          <EditableField name="description" type="text" options={lesson} />
        </label>
      </form>
      <button type="submit" onClick={submitForm}>
        Create/Update
      </button>
    </div>
  );
}
