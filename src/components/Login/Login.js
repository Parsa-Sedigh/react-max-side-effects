import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-context";
import Input from "../Input/Input";

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.includes('@')};
    }
    if (action.type === 'USER_BLUR') {
        return {value: state.value, isValid: state.value.includes('@')};
    }

    return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if (action.type === 'USER_BLUR') {
        return {value: state.value, isValid: state.value.trim().length > 6};
    }

    return {value: '', isValid: false};
};

const Login = (props) => {
    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    const authCtx = useContext(AuthContext);

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            clearTimeout(identifier);
        };

    }, [emailIsValid, passwordIsValid]);

    const emailChangeHandler = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});

        // setFormIsValid(
        //   event.target.value.includes('@') && enteredPassword.trim().length > 6
        // );
        setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
    };

    const passwordChangeHandler = (event) => {
        // setEnteredPassword(event.target.value);
        dispatchPassword({type: 'USER_INPUT', val: event.target.value});

        // setFormIsValid(
        //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
        // );
        setFormIsValid(
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => { // when for example the password field blurred
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else { // if we get here, it means that the password is not valid OR BOTH could be invalid ???
            passwordInputRef.current.focus();
        }

    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input ref={emailInputRef}
                       id="email"
                       label="E-Mail"
                       type="email"
                       isValid={emailIsValid}
                       value={emailState.value}
                       onChange={emailChangeHandler}
                       onBlur={validateEmailHandler}/>
                {/*<div*/}
                {/*    className={`${classes.control} ${*/}
                {/*        emailState.isValid === false ? classes.invalid : ''*/}
                {/*    }`}>*/}
                {/*    <label htmlFor="email">E-Mail</label>*/}
                {/*    <input*/}
                {/*        type="email"*/}
                {/*        id="email"*/}
                {/*        value={emailState.value}*/}
                {/*        onChange={emailChangeHandler}*/}
                {/*        onBlur={validateEmailHandler}*/}
                {/*    />*/}
                {/*</div>*/}

                {/*<div*/}
                {/*    className={`${classes.control} ${*/}
                {/*        passwordState.isValid === false ? classes.invalid : ''*/}
                {/*    }`}*/}
                {/*>*/}
                {/*    <label htmlFor="password">Password</label>*/}
                {/*    <input*/}
                {/*        type="password"*/}
                {/*        id="password"*/}
                {/*        value={passwordState.value}*/}
                {/*        onChange={passwordChangeHandler}*/}
                {/*        onBlur={validatePasswordHandler}*/}
                {/*    />*/}
                {/*</div>*/}
                <Input ref={passwordInputRef}
                       id="password"
                       label="Password"
                       type="password"
                       isValid={passwordIsValid}
                       value={passwordState.value}
                       onChange={passwordChangeHandler}
                       onBlur={validatePasswordHandler}/>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
