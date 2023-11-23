import React, { useState } from 'react';
import "../../styles/ClassCard.scss"

const Card = ({ poster }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`classCard ${collapsed ? 'collapsed' : ''}`}>
            <div className="background">
                <img src={poster} alt="Movie Poster" />
            </div>
            <div className="content">
               
                <div className="row">
                    <div className="element">Class Info</div>
                    <div className="seat-circle right">
                        <h3 className="count">14</h3>
                        <span className="unit">Week</span>
                    </div>
                </div>
                <div className="row">
                    <div className="element">Final Project 3</div>
                    <div className="element">18</div>
                </div>
                <div className="row">
                    <div className="element">
                        <div className="element sub">Technical Education/Personal Development</div>
                    </div>
                    <div className="element">November</div>
                </div>
                <div>
                    <div className="element"></div>
                    <div className="element">2023</div>
                </div>
                <div>
                    <div className="element"><button>Agenda</button><button>Syllabus</button></div>
                    <div className="element">10:00 - 17:00</div>
                </div>
                <div className={`row ${collapsed ? 'hide' : ''}`}>
                    <div className="element">Attendies:</div>
                    <p>Jonathan</p>
                </div>
                <div className="row bar bottom" onClick={toggle}>
                    <div className="sub right">{collapsed ? 'Show' : 'Hide'} Experiences and Amount</div>
                </div>
            </div>
        </div>
    );
};

const ClassCard = () => {
    const random = '//unsplash.it/200/300/?random';
    const props = {
        poster: random,
    };

    return <Card {...props} />;
};

export default ClassCard;
