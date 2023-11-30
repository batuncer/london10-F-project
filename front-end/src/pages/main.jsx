import Navbar from "../components/barComponents/Navbar"
import { makeStyles } from '@mui/styles';
import ClassCard from "../components/classes/ClassCard";
import UserGuard from "../auth/UserGuard";


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
        <UserGuard>
            <div className="main-container">
                <Navbar />
                <ClassCard className={classes.root} />
                <ClassCard className={classes.root} />
                <ClassCard className={classes.root} />
                <ClassCard className={classes.root} />
            </div>
        </UserGuard>

    )
}

export default Main;