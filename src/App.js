import React, {useContext, useEffect, useState} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-context";

function App() {
    // const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const ctx = useContext(AuthContext);

    // would cause infinite loop, if we don't use useEffect()
    // if (storedUserLoggedInInformation === '1') {
    //     setIsLoggedIn(true);
    // }
    // useEffect(() => {
    //     const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    //     if (storedUserLoggedInInformation === '1') {
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    // const loginHandler = (email, password) => {
    //     // We should of course check email and password
    //     // But it's just a dummy/ demo anyways
    //     localStorage.setItem('isLoggedIn', '1');
    //     setIsLoggedIn(true);
    // };

    // const logoutHandler = () => {
    //     localStorage.removeItem('isLoggedIn')
    //     setIsLoggedIn(false);
    // };

    return (
        <>
             {/*<AuthContext.Provider value={{isLoggedIn: false, onLogout: logoutHandler}}>*/}
                {/*<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>*/}
                <MainHeader />
                <main>
                    {!ctx.isLoggedIn && <Login />}
                    {ctx.isLoggedIn && <Home />}
                </main>
             {/*</AuthContext.Provider>*/}
            </>
    );
}

export default App;
