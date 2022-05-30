import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { render } from "@testing-library/react";
import "../Styles/layout1.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  paper: {
    padding: theme.spacing(3),
    margin: "auto",
    marginTop: "10%",

    maxWidth: 500,
    backgroundColor: "white",
  },
  typo: {
    color: "black",
  },

  img: {
    height: "200px",
    width: "200px",
    borderRadius: "50px",
  },
}));

/*
textGrid ;
this component is same with complexGrid 
the main difference is this component is not here to display any data but shows text
(in this example it shows contact info or in main page shows hello text)
*/

function TextGrid(props) {
  const classes = useStyles();
  const { Id, Name, Desc,  Image, unitp , totalw } = props;




  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <img className={classes.img} src={Image} />

            <Grid item xs className={classes.typo}>
              <Typography gutterBottom variant="subtitle1">
                {Name}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {Desc}
              </Typography>
              <Typography variant="body2">{unitp}</Typography>
              <Typography variant="body2">{totalw}</Typography>
              
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function CategoryPage(props) {
  const { category } = props;
  const [cat, setCat] = useState("");
  const [data, setData] = useState([]);


  useEffect(
    () => {

      
      if(category == 4){ 
        setCat("Kuruyemiş")

      }
      if(category == 3){  setCat("Sebze")}
      if(category == 2){ setCat("Meyve")}


      axios
        .get(`https://localhost:44326/TarGet/Products/Category/${category}`)
        .then(
          (resp) => setData(resp.data),
          (err) => console.log(err)
        )
        .catch((e) => console.log(e));
    },
    [props],
    
  );

  return (
    <>
    <div className="layout1-flex">
      
      <h1> Kategoriler , {cat}  </h1>
      <div className="flex-row-wrapped">
        {data && data.map((info,index) => 
          <TextGrid
            key={index}
            Id = {info.pt_Id}
            Name= {info.pt_Name}
            Desc= {info.pt_Description}
            Image= {info.pt_Image}
            unitp= {info.pt_UnitPrice} 
            totalw= {info.pt_TotalWeight} 

          />
        )}
      </div>
      </div>
    </>
  );
}

export default CategoryPage;
