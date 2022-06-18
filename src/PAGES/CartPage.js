import axios from "axios";
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import "../Styles/layout1.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Button } from  "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "aliceblue",
  },
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    

    maxWidth: 500,
    backgroundColor: "aliceblue",
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
  const { ptid, cdid, ptunitw, ptunitp ,date} = props;
  const [data,setData] = useState();
  const [img,setImg] = useState();
  const [name,setName]= useState();
 

  useEffect(async ()=> {
    /*
    axios
    .get(`https://localhost:44326/TarGet/Products/${ptid}`)
    .then(resp => {setData(resp.data)})
    .catch(err => console.log(err))
    */
    const data2 = await fetch(`https://localhost:44326/TarGet/Products/${ptid}`)
    .then((resp) => resp.json())
    .then((data) => {
      setData(data)
      console.log(data);
      setName(data.pt_Name);
      setImg(data.pt_Image);
    })
    .catch((err) => console.log(err));
    
  },[])
  
 
  
  console.log(data);

  /*
  */  


  const Delete= async () => {

    await axios
          .delete(`https://localhost:44326/TarGet/CartDetails/${cdid}`)
          .then(resp => console.log(resp))

  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <img className={classes.img} src={img} />

            <Grid item xs className={classes.typo}>
              <Typography gutterBottom variant="title">
                Ürün ismi : {name}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                Ürün Miktarı :  55
              </Typography>
              <Typography variant="body1">Birim Ağırlığı: {ptunitw}</Typography>
              <Typography variant="body1">Birim Fiyatı: {ptunitp}</Typography>
              <Typography variant="body1">Tarih: {date}</Typography>
              <Button variant="outlined" onClick={Delete}>Sepetten Sil</Button>
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

  const Pay = async () => {

    const sendpay = {
      "ct_Id": ReactSession.get("cartId"),
      "ct_Paid": 1
    }

    if(data.length == 0 ){
      alert("sepetiniz  boş !")
    }

    if(data !=null && data != undefined && data.length != 0 ){
    await axios
    .put(`https://localhost:44326/TarGet/Cart/${ReactSession.get("cartId")}`,sendpay)
    .then(resp => console.log(resp) )
    .catch(err => console.log(err))

    await fetch(`https://localhost:44326/ComplexCart/${ReactSession.get("UID")}`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      ReactSession.set("cartId", data.ct_Id);
    })
    .catch((err) => console.log(err));
    
     alert("Ödemeniz başarıyla tamamlanmıştır");
  }

  }

  return (
    <>
      <div class="layout1-flex">
        <div class="flex-row">
          <Typography variant="h2">{header}</Typography>
        </div>
        <div class="flex-row-wrapped">
          {data &&
            data.map((info, index) => (
              <TextGrid
                cdid= {info.cD_Id}
                ptid={info.pt_ID}
                img={info.pt_Image}
                ptunitp={info.cD_TotalPrice}
                ptunitw={info.cD_Quantity}
                date= {info.cD_date}
              />
            ))}
        </div>
            <div className="flex-row">
            <Button variant="outlined" className="button-öde"  onClick={Pay}>Ödeme Yapın</Button> 
            </div>
      </div>
    </>
  );
}

export default CartPage;
