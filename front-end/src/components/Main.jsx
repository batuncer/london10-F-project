import ClassCard from "./ClassCard";
import Navbar from "./Navbar"
//import "../styles/Main.scss"
import { makeStyles } from '@mui/styles';


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

    return(
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