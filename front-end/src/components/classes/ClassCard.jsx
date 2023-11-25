import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import "../../styles/ClassCard.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const ClassCard = () => {
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
                    <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp" alt="Date Image" />
                    <div className='blog-slider__title'>
                        <p>25</p>
                        <p>November</p>
                        <p>2023</p>
                    </div>
                </div>
                <div className="blog-slider__content">
                    <div className="blog-slider__title">Employability Module 3</div>
                    <div className="blog-slider__text">Technical Education</div>
                    <div className="blog-slider__text">10:00 - 16:30</div>
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
                            Baki Anna and Saim will join the class.
                        </Modal.Body>
                        <Modal.Body>
                            Baki Anna and Saim will join the class.
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="circle">
                    <p>WEEK 1</p>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
