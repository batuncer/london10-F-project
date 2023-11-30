import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function BottomCard(props) {
    const cardStyle = {
        width: 300,
        height: 250,
        borderRadius: "10px",
        border: "1px solid red",
        //transition: "border 0.3s",
    };

    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
    };

    return (
        <Link to={props.link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <Card
                sx={cardStyle}
                onMouseOver={() => { cardStyle.border = "14px solid red"; }}
                onMouseOut={() => { cardStyle.border = "1px solid red"; }}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image={props.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.h1}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}
