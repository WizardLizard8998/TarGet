import React, { useContext } from "react";
import "../Styles/layout1.css";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { Paper, Grid } from "@mui/material";

import slide1 from "../DATA/IMAGES/Biber.jpg";
import slide2 from "../DATA/IMAGES/Domates.jpg";
import slide3 from "../DATA/IMAGES/Hıyar.jpg";
import Slider from "./Slider/Slider";
import { data } from "../DATA/data.jsx";
import { Button } from "@mui/material";
import { Typography } from "@material-ui/core";
import axios from "axios";

import { ReactSession } from "react-client-session";
import { AccountContext } from "../DATA/AccountProvider";

ReactSession.setStoreType("localStorage");

function TextGrid(props) {
  const [producer, setProducer] = useState([]);
  const [pName, setpName] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "antiquewhite",
    },
    paper: {
      padding: theme.spacing(3),
      margin: "auto",
      marginTop: "10%",

      maxWidth: 500,
      backgroundColor: "Cornsilk",
    },
    typo: {
      color: "black",
    },

    img: {
      height: "250px",
      width: "50%",
      borderRadius: "50px",
    },
  }));

  const classes = useStyles();
  const { ptname, ptdesc, ptunitp, ptunitw, text4, img, ptid, pid } = props;

  const [user, setUser] = useState(ReactSession.get("UID"));

  const [data, setData] = useState();

  useEffect(async () => {
    /*
        axios
        .get(`https://localhost:44326/TarGet/Producers/${pid}`)
        .then(resp => {setProducer(resp.data)
            console.log(producer)
          })
        .then(data => {
          setProducer(data)
          console.log(producer)
          producer.map((d,k) => {
            setpName(d.p_Name)
            console.log(d)
            console.log(pName)
          })
        })
          */

    await fetch(`https://localhost:44326/TarGet/Customer/UAID/${user}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setData(data.c_Id);
      });

    const data2 = await fetch(`https://localhost:44326/TarGet/Producers/${pid}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setpName(data.p_Name);
      })
      .catch((err) => console.log(err));
  }, [pid]);

  const onClick = async () => {
    let post = {
      pt_ID: ptid,
      ct_Id: ReactSession.get("cartId"),
      cD_Quantity: ptunitw,
      cD_TotalPrice: ptunitw,
    };

    if (ReactSession.get("Title") == "Producer") {
      alert("üreticiler satın alamaz!!");
    }

    if (ReactSession.get("Title") == "Customer") {
      await axios
        .post(`https://localhost:44326/TarGet/CartDetails`, post)
        .then((resp) => alert("sepetinize eklenmiştir"));
    }

    if (
      ReactSession.get("Title") == " " ||
      ReactSession.get("Title") == undefined
    ) {
      alert("Önce giriş yapın");
    }

    alert(data);
  };

  return (
    <div className="flex-row-wrapped">
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <img className={classes.img} src={img} />

            <Grid item xs className={classes.typo}>
              <Typography gutterBottom variant="title">
                Ürün ismi : {ptname}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                Ürün Açıklaması: {ptdesc}
              </Typography>
              <Typography variant="body2">Birim Ağırlığı: {ptunitw}</Typography>
              <Typography variant="body2">Birim Fiyatı: {ptunitp}</Typography>
              <Typography variant="body2">Üretici : {pName}</Typography>
              <Button onClick={onClick}>sepete ekle</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function MainPage() {
  // functions that may included will be written here

  const [data, setData] = useState([]);

  const { UID } = useContext(AccountContext);

  useEffect(async () => {
    axios
      .get("https://localhost:44326/TarGet/Products")
      .then((resp) => setData(resp.data));
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: "white",
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  return (
    <>
      <div class="layout1-flex">
        <div class="flex-row">
          <Slider />
        </div>
        <div className={classes.root}>
          <Typography>Bu haftanın ürünleri</Typography>
        </div>
        <div class="flex-row-wrapped">
          {data.map((data) => (
            <TextGrid
              img={data.pt_Image}
              ptname={data.pt_Name}
              ptdesc={data.pt_Description}
              ptunitp={data.pt_UnitPrice}
              ptunitw={data.pt_UnitWeight}
              pid={data.p_Id}
              ptid={data.pt_Id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;

/*

                <div class="footer">

                    <div >
                        <h1>Sayfalar</h1>
                        <h1>Ana Sayfa</h1>
                        <h1>Haftanın ürünleri</h1>

                    </div>

                    <div >
                        <h1>Merhaba !</h1>
                        <h1>Bize Ulaşın</h1>

                    </div>

                    <div >
                        <h1>Hakkımızda</h1>
                    </div>

                </div>
*/
