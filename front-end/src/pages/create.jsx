import LessonForm from "../components/lessonForm/lessonfrom";
import SessionForm from "../components/lessonForm/sessionform";

const Create = () => {
  

  return (
    <div className="general-form-container">
      <div className="form-container">
        <LessonForm />
      </div>
      <div className="form-container">
        <SessionForm />
      </div>
    </div>
  );
};

export default Create;
