import React, {useEffect, useState} from 'react';
import Navbar from "../components/barComponents/Navbar";
import { makeStyles } from '@mui/styles';
import ClassCard from "../components/classes/ClassCard";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const url = `${process.env.REACT_APP_BASE_URL}/session`

const Main = () => {
    const classes = useStyles();
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json(); 
                setData(result);
                console.log(result[0].date.substring(0, 4)); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    

    return (
        <div className="main-container">
             <Navbar />
            {data.map((s) => (
                <ClassCard
                    key={s.id} 
                    className={classes.root}
                    date={s.date}
                    time_start={s.time_start}
                    time_end={s.time_end}
                    module_name={s.module_name}
                />
            ))}
        </div>
    );
};

export default Main;