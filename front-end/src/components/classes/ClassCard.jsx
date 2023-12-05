import React from 'react';
import SeeAttendancesButton from './SeeAttendancesButton';
import SignUpLessonButton from './SignUpLessonButton';
import "../../styles/ClassCard.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassCard = (props) => {
    return (
        <div className="blog-slider">
            <div className="blog-slider__item">
                <div className="blog-slider__img">
                    <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp" alt="Date pic" />
                    <div className='blog-slider__title'>
                        <p>{props.date.substring(8, 10)}</p>
                        <p>{props.date.substring(5, 7)}</p>
                        <p>{props.date.substring(0, 4)}</p>
                        <p style={{ fontSize: "14px" }}>{props.time_start.substring(0, 5)} - {props.time_end.substring(0, 5)}</p>
                    </div>
                </div>

                <div className="blog-slider__content">
                    <div className="blog-slider__title">{props.module_name}</div>
                    <div className="blog-slider__text"></div>
                    <div className="blog-slider__text"></div>
                    <div>
                        {props.city} / {props.cohort}
                    </div>
                    <div>
                        {props.location}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' , marginTop:'15px'}}>
                        <SeeAttendancesButton whoLeading={props.who_leading} sessionId={props.sessionId} />
                        <SignUpLessonButton sessionId={props.sessionId} />
                    </div>

                </div>

                <div className="circle blog-slider__title">
                    <p>Week </p>
                    <p>{props.module_week}</p>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
