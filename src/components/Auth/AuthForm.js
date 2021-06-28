import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredemail = emailRef.current.value;
    const enteredpassword = passwordRef.current.value;

    if (isLogin) {
      console.log("hi");
    } else {
      console.log("hlw");
      try {
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzdNc3U4mSp46_1mgSWMCVpXxIZWAuNDw",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredemail,
              password: enteredpassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => {
          console.log("hp");
          if (res.ok) {
            console.log("a", res);
          } else {
            return res.json().then((data) => {
              console.log("p", data);
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
