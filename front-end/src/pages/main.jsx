import Navbar from "../components/barComponents/Navbar"
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

const Main = () => {
    const classes = useStyles();

    return (
        <div className="main-container">
            <Navbar />
            <ClassCard className={classes.root} />
            <ClassCard className={classes.root} />
            <ClassCard className={classes.root} />
            <ClassCard className={classes.root} />
        </div>
    )
}

export default Main;