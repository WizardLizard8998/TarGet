import React, { useContext } from "react";

import "../Styles/layout1.css";
import "../Styles/Style.css";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { AccountContext } from "../DATA/AccountProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();

  const [Pwdcheck, setPwdcheck] = React.useState("");

  const { Mail, Password, Title, setMail, setPassword, setTitle } =
    useContext(AccountContext);

  const history = useHistory();

  const onClick = () => {
    if (Password == Pwdcheck) {
      console.log(Mail, " ", Password, " ", Title);
    } else {
      alert("Girdiğiniz şifreler aynı olmalıdır.");
    }

    let data = {
      uA_Email: Mail,
      uA_Password: Password,
      uA_Title: Title,
      uA_DateEntered: Date.now(),
    };

    if (Mail != null && Password != null && Title != null) {
      axios
        .post("https://localhost:44326/TarGet/UserAcc", data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          alert(e);
        });

      if (Title == "Producer") {
        history.push("/");
      }
      if (Title == "Customer") {
        history.push("/deneme");
      }
    }
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <div className="login-register-box">
        <form className={classes.root} autoComplete="off">
          <h1>
            {" "}
            Merhaba! TarGet'a hoşgeldiniz, lütfen kaydolmak için aşağıdaki
            bilgileri doldurun{" "}
          </h1>
          <div className={classes.root}>
            <TextField
              id="standard-basic"
              value={Mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
              label="E-mail "
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
            <TextField
              id="standard-basic"
              value={Pwdcheck}
              label="Şifre Tekrar"
              onChange={(event) => {
                setPwdcheck(event.target.value);
              }}
              type="password"
            />
          </div>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Pozisyon</InputLabel>
                <Select
                  labelId="title-select"
                  id="title-select"
                  value={Title}
                  label="Pozisyon"
                  onChange={handleChange}
                >
                  <MenuItem value={"Producer"}>Ben Üretici/Satıcıyım</MenuItem>
                  <MenuItem value={"Customer"}>Ben Müşteriyim</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>

          <div className={classes.root}>
            <Button variant="outlined" onClick={onClick}>
              Kayıt Ol!
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
