import { Typography } from "@material-ui/core";
import React from "react";
import {ReactSession} from "react-client-session";
import { useHistory } from "react-router-dom";
import {useEffect} from "react";


function LogOut(props) {
    ReactSession.set("UID",undefined)
   

    const history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() =>{ 
            history.push("/")
            window.location.reload(false)
        
        }, 1000);

        const timer2 = setTimeout(() =>{ 
            window.location.reload(false)
        }, 999);
        return () => clearTimeout(timer);
      }, []);


    return(
        <>
        <Typography variant="body">Çıkışınız yapılmıştır... </Typography>
        </>
    )


}

export default LogOut;