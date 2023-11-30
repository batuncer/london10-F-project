import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "../../styles/ClassCard.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassCard = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonClick = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

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
                    <Button
                        variant="primary"
                        onClick={handleButtonClick}
                        style={{
                            backgroundImage: 'linear-gradient(100deg,#36454f  0%, #36454f 74%)',
                            padding: '15px 35px',
                            borderRadius: '50px',
                            color: '#fff',

                            border: 'none', 

                        }}
                    >
                        SEE ATTENDANCES
                    </Button>
                    <Modal show={modalVisible} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>ATTENDANCES</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <b>Who is leading: </b>
                            {props.who_leading}
                        </Modal.Body>
                        <Modal.Body>
                            Attendances
                        </Modal.Body>
                    </Modal>
                <div>
                    {props.city} / {props.cohort}
                </div>
                <div>
                    {props.location}
                </div>
                </div>

                <div className="circle blog-slider__title">
                    <p>Week</p>
                    <p>{props.module_week}</p>
                </div>
            </div>
        </div>
    );
};
//changes done here
export default ClassCard;
