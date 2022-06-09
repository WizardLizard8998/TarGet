import axios from "axios";
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import "../Styles/layout1.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    height: "300px",
    width: "300px",
    borderRadius: "50px",
  },
}));

function TextGrid(props) {
  const classes = useStyles();
  const { ptname, ptdesc, ptunitw, ptunitp, img } = props;
  return (
    <div className={classes.root}>
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
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function CartPage() {
  const [cartId, setCartId] = useState("");
  const [data, setData] = useState([]);
  const [header, setHeader] = useState("Sepetiniz");

  useEffect(async () => {
    setCartId(ReactSession.get("cartId"));

    await fetch(
      `https://localhost:44326/TarGet/CartDetails/cart/${ReactSession.get(
        "cartId"
      )}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        setHeader("Sepetiniz Boş");
      });

    //ürünlerin bilgilerini göster ve finito...
  }, []);

  return (
    <>
      <div>
        <div>
          <Typography variant="h2">{header}</Typography>
        </div>
        <div>
          {data &&
            data.map((info, index) => (
              <TextGrid
                img={info.pt_Image}
                ptname={info.pt_Name}
                ptdesc={info.pt_Description}
                ptunitp={info.pt_UnitPrice}
                ptunitw={info.pt_UnitWeight}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default CartPage;
