import React, { useState,useEffect } from "react";
import "../Styles/layout1.css";


import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "aliceblue",
  },
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    marginTop: "10%",

    maxWidth: 500,
    backgroundColor: "aliceblue",
  },
  typo: {
    color: "black",
  },

  img: {
    height: "250px",
    width: "250px",
    borderRadius: "50px",
  },
}));

/*
textGrid ;
this component is same with complexGrid 
the main difference is this component is not here to display any data but shows text
(in this example it shows contact info or in main page shows hello text)
*/

function ProducerGrid(props) {
  const classes = useStyles();
  const { name, desc, address,phone,email ,img } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <img className={classes.img} src={img}></img>

            <Grid item xs className={classes.typo}>
              <Typography gutterBottom variant="subtitle1">
                {name}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {desc}
              </Typography>
              <Typography variant="body2">Adresimiz : {address}</Typography>
              <Typography variant="body2">İrtibat hattımız: {phone}</Typography>
              <Typography variant="body2">E-postamız : {email}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}



function ProducerPage(props) {

  const [data,setData]= useState();
  useEffect(() => {
    
      fetch("https://localhost:44326/TarGet/Producers")
      .then(resp => resp.json())
      .then(data => setData(data))
    
    }, [])
      
      console.log(data)

  
  return (
    <>
      <div className="layout1-flex">
        <div class="flex-row">
        <h1>Üreticilerimiz </h1>
        </div>
        <div className="flex-row-wrapped">
            {data && data.map((info,index) => 
              <ProducerGrid
              name ={info.p_Name}
              desc ={info.p_Description}
              address={info.p_Address}
              phone = {info.p_Phone}
              email = {info.p_Email}
              img  = {info.p_Picture}
              />
            )}
        </div>
      </div>
    </>
  );
}

export default ProducerPage;
