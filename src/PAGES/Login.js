import React, { useEffect, useState } from "react";
import { useContext } from "react";

import "../Styles/layout1.css";
import "../Styles/Style.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AccountContext } from "../DATA/AccountProvider";
import axios from "axios";
import { data } from "../DATA/data";
import { useHistory } from "react-router-dom";

import {ReactSession} from "react-client-session";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

function Login() {
  const classes = useStyles();
  const {
    Mail,
    setMail,
    Password,
    setPassword,
    UID,
    setUID,
    Title,
    setTitle,
  } = useContext(AccountContext);

  const [data, setData] = useState([]);
  const history=useHistory();


  const onClick = () =>  {
      // iki kere tıkladığında gönderiyor 
      //muhtemelen useEffect ile alakalı 
      //buraya göz atacan
    axios
      .get(`https://localhost:44326/TarGet/UserAcc/${Mail}/${Password}`)
      .then((response) => {
        console.log(response.data);
        console.log(response.status);
        
          setData(response.data);
         
          if(response.data.uA_Title =="Producer"){
            history.push("/üreticiProfil");
  
          }
  
          if(response.data.uA_Title=="Customer"){
            history.push("/");
          }
        
      })
      .catch((e) => {
        console.log(e);
      });
    };

    useEffect(() => {

        ReactSession.set("UID",data.uA_Id)
        setTitle(data.uA_Title)
        setUID(data.uA_Id)
    },[][data])
  
  return (
    <>
      <div className="login-register-box">
        <form className={classes.root} autoComplete="off">
          <h1> Merhaba!!! TarGet'a hoşgeldiniz, lütfen giriş yapın </h1>
          <div className={classes.root}>
            <TextField
              id="standard-basic"
              value={Mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
              label="Mail"
            />
          </div>
          <div className={classes.root}>
            <TextField
              id="standard-basic"
              value={Password}
              label="Şifre "
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
            />
          </div>
          <div className={classes.root}>
            <Button variant="outlined" onClick={onClick}>
              Giriş Yapın!
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
