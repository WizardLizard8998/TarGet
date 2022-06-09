import React from "react";
import { Typography } from "@mui/material";
import "../Styles/layout1.css";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Footer(props) {
  const history = useHistory();
  const Pages = ["Anasayfa", "Üreticiler", "Meyveler", "Sebzeler"];

  return (
    <>
      <div class="footer">
        <div>
          <h3>Merhaba !</h3>
          <h5>
            <li>
              <Link to="/Anasayfa"> Anasayfa </Link>
            </li>
          </h5>
          <h5>
            <li>
              <Link to="/Üreticiler"> Üreticiler </Link>
            </li>
          </h5>
          <h5>
            <li>
              <Link to="/Meyve"> Meyve</Link>
            </li>
          </h5>
          <h5>
            <li>
              <Link to="/Sebze"> Sebze </Link>
            </li>
          </h5>
        </div>

        <div>
          <h3>Merhaba !</h3>
          <h5>
            <li>
              <Link to="/BizeUlaşın"> Bize Ulaşın </Link>
            </li>
          </h5>
          <h5>
            <li>
              <Link to="/Hakkımızda"> Hakkımızda </Link>
            </li>
          </h5>
        </div>

        <div>
          <h1>TarGet </h1>
        </div>
      </div>
    </>
  );
}

export default Footer;

/*
              <Typography  onClick={Click}  variant="h5" >Anasayfa</Typography>
          <Typography  onClick={Click}  variant="h6" >Anasayfa</Typography>
          <Typography  onClick={Click}  variant="h6" >Anasayfa</Typography>
*/
