import React from "react";
import "./css/bottomBar.css"
import Button from "@mui/material/Button";
import {signInWithGoogle} from "./firebase";
import {signOut} from "./firebase";
import {useUserState} from "./firebase";

const buttonStyle = {
    bgcolor: "rgba(28,133,255,0.95)",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
        bgcolor: "rgba(129,182,239,0.95)"
    }
}

const SignOutButton = () => (
    <Button sx={buttonStyle}
            onClick={() => signOut()}>
        Sign Out
    </Button>
);

const SignInButton = () => (
    <Button sx={buttonStyle}
            onClick={() => signInWithGoogle()}>
        Sign In
    </Button>
);

export const Bottom = () => {
    const [user] = useUserState();

    return (
        <div className="bottombar">
            <img
                className="logo"
                src="https://i.loli.net/2021/11/16/CA6pPW1X8zIeGVL.png"
                alt="AppLogo"
            />
            <p style={{color:"grey", fontSize:"16px"}}>subscript</p>
            <div className="welcome">
                { user ? <p> Welcome! {user.email} </p> : <p> </p>}
            </div>
            <div className="button">
                { user ?  <SignOutButton /> : <SignInButton /> }
            </div>
        </div>
    )
}