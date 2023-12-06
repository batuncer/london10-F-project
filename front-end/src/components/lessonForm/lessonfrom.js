import { useState, useEffect } from "react";
import EditableField from "./EditableField";
import axios from '../../utils/axios';


export default function LessonForm() {
  const [module_no, setModule_no] = useState([]);
  const [module, setModule] = useState([]);
  const [week_no, setWeek_no] = useState([]);
  const [topic, setTopic] = useState([]);
  const [link, setLink] = useState([]);

  useEffect(() => {
    async function fetchData () {
      try {
      const response = await axios.get("lesson_content");
      setModule_no(response.data.map((item) => item.module_no));
      setModule(response.data.map(item => item.module));
      setWeek_no(response.data.map(item => item.week_no));
      setTopic(response.data.map(item => item.lesson_topic));
      setLink(response.data.map(item => item.syllabus_link));
      }
      catch (error){
        console.log(error)
      }
    }
    fetchData();
  }, [])
  

  async function submitForm() {
    console.log("Form submitted");
       
    try{
      const response = await axios.post("/lesson_content", {module: module,
    module_no: module_no,
    week_no: week_no,
    lesson_topic: topic,
    syllabus_link: link});
    }
    catch (error){
      console.log(error)
    }
  }

  return (
    <div className="formDiv">
      <form onSubmit={submitForm}>
        <h2>Lesson Content</h2>
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
