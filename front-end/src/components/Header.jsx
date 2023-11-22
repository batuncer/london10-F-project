import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Header = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar style={{ backgroundColor: "white" }}>
                    <img
                        src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png"
                        alt="Code Your Future Logo"
                        style={{ height: '90px', marginRight: '0px' }}
                    />
                    <Typography variant="h2" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginRight: "300px", color: "black" }}>
                        Class Planner
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;