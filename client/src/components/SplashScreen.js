import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function SplashScreen() {


    return (
        <div id="splash-screen">
            <div id="title-app">
                THE TOP 5 LISTER<br />
                APPLICATION
            </div>
            <div id="explain-app">
                Welcome to Top 5 Lister! In this website, you can create your own Top 5 Lists over some <br />
                of your favorite topics such as sports, music, video games, foods, etc. You can also <br />
                share with and explore from our friendly community of users and their lists as well.<br />
                Enjoy!
            </div>
            <div class="splash-buttons">
                Don't have an account?<br /> Sign Up here....<br />
                <Button><Link to='/register/'>Sign Up</Link></Button>
            </div>
            <div class="splash-buttons">
                Already have an account?<br /> Log in here....<br />
                <Button><Link to='/login/'>Sign In</Link></Button>
            </div>
            <div class="splash-buttons">
                ....Or continue as a guest<br />
                <Button>Continue As Guest</Button>
            </div>
        </div>
    )
}