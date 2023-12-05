import Navbar from "../components/barComponents/Navbar";
import LessonForm from "../components/lessonForm/lessonfrom";
import SessionForm from "../components/lessonForm/sessionform";

const Create = () => {
  

  return (
    <>
    <Navbar />
    <div className="general-form-container" style={{marginTop: "250px"}}>
      <div className="form-container">
        <LessonForm />
      </div>
      <div className="form-container">
        <SessionForm />
      </div>
    </div>
    </>
  );
};

export default Create;
