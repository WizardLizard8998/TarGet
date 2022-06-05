import React from 'react';
import '../Styles/layout1.css';
import {useState, useEffect } from "react"; 
import { makeStyles } from '@material-ui/core';

import {Paper,Grid} from "@mui/material";


import slide1 from '../DATA/IMAGES/Biber.jpg';
import slide2 from '../DATA/IMAGES/Domates.jpg';
import slide3 from '../DATA/IMAGES/Hıyar.jpg';
import Slider from './Slider/Slider';
import { data } from '../DATA/data.jsx';

import { Typography } from '@material-ui/core';
import axios from 'axios';

import {ReactSession} from "react-client-session";

ReactSession.setStoreType("localStorage")



 function TextGrid(props) {

    const [producer,setProducer] = useState([])

    const useStyles = makeStyles((theme) => ({
        root: {
          
          backgroundColor: 'antiquewhite',
        },
        paper: {
          padding: theme.spacing(3),
          margin: 'auto',
          marginTop: '10%',
          
          maxWidth: 500,
          backgroundColor: 'Cornsilk',
          
      
        },
        typo: {
          color: 'black',
        },
      
        img:{
          height:"250px", 
          width:"50%",
          borderRadius:"50px",
      
        }
      
      }));



    const classes = useStyles();
    const { ptname, ptdesc, ptunitp, ptunitw, text4 ,img,
         ptidü, pid
        
    } = props;

    useEffect(() => {

        axios
        .get(`https://localhost:44326/TarGet/Producers/${pid}`)
        .then(resp => {setProducer(resp.data)
            console.log(producer)})
        .then(data => setProducer(data))
    },[pid])

    

    return (
      <div className="flex-row-wrapped">
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <img className={classes.img} src={img} />
              
              <Grid item xs className={classes.typo}>
                <Typography gutterBottom  variant="subtitle1">
                  {ptname}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {ptdesc}
                </Typography>
                <Typography variant="body2" >
                  {}
                </Typography>
                <Typography variant="body2">
                  {ptunitp}
                </Typography>
                <Typography variant="body2">
                  {"Çiftlik"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }



function MainPage() {

    // functions that may included will be written here

    const [data,setData] = useState([]);

    useEffect(() => {
        axios
        .get("https://localhost:44326/TarGet/Products")
        .then(resp => setData(resp.data))

    },[])
    

    const useStyles = makeStyles((theme) => ({
        root: {
            ...theme.typography.button,
            backgroundColor: 'white',
            padding: theme.spacing(1),
        },
    }));


    const classes = useStyles();
    return (

        <>
            <div class="layout1-flex">

                

                <div class="flex-row">

                    <Slider/>
                    
               </div>
                <div className={classes.root} >
                    <Typography>Bu haftanın ürünleri</Typography>
                </div>
                <div class="flex-row-wrapped">
                    {data.map(data =>
                        <TextGrid
                            img={data.pt_Image}
                            ptname={data.pt_Name}
                            ptdesc={data.pt_Description}
                            ptunitp={data.pt_UnitPrice}
                            //pt={data.c_Id}
                            pid={data.p_Id}
                        />

                    )}

                </div>




            </div >

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