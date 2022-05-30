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
  const { text0, text1, text2, text3, text4, img } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <img className={classes.img} src={img} />

            <Grid item xs className={classes.typo}>
              <Typography gutterBottom variant="subtitle1">
                {text0}
              </Typography>
              <Typography gutterBottom variant="subtitle1">
                {text1}
              </Typography>
              <Typography variant="body2">{text2}</Typography>
              <Typography variant="body2">{text3}</Typography>
              <Typography variant="body2">{text4}</Typography>
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

      if(category == 4){ setCat("Kuruyemiş")}
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
      <h1>{category}</h1>
      <h1>{cat}</h1>
      <div className="flex-row-wrapped">
        {data && data.map((info,index) => 
          <TextGrid
            key={index}
            text0={info.pt_Name}
            text1={info.pt_Description}
            img={info.pt_Image}
            
          />
        )}
      </div>
      </div>
    </>
  );
}

export default CategoryPage;
