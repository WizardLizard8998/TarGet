import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AccountContext } from "../DATA/AccountProvider";
import { TextField } from "@mui/material";
import "../Styles/Style.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Email, ReplySharp } from "@material-ui/icons";
import { Box,FormControl,InputLabel,Select,MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function Profile(props) {
  const {
    Mail,
    Password,
    Title,
    UID,
    setMail,
    setPassword,
    Name,
    Adress,
    Did,
    pCode,
    Phone,
    setName,
    setAdress,
    setDid,
    setpCode,
    setPhone,
    DescLName,
    Image,
    setDLN,
    setImage,
  } = useContext(AccountContext);
  const [label1, setLabel1] = useState("");
  const [label2, setLabel2] = useState("");
  const [TempPassword, setTempPassword] = useState("");
  const [city,setCity] = useState(""); 
  const [cities,setCities] = useState([]);
  const [district,setDistrict] = useState(""); 
  const [districts,setDistricts] = useState([]);
  const [disabled,setDisabled] =useState(false);


  useEffect(() =>{

    axios 
    .get(`https://localhost:44326/TarGet/District/DistrictByCity/${Did}`)
    .then(resp => {
      //setDistricts(resp.data)
    })


  },[handleChange])
  console.log(cities)


  const classes = useStyles();

  let profile = {
    UA_Email: Mail,
    UA_Title: Title,
    UA_Password: Password,
  };

  useEffect(() => {
    if (Title === "Producer") {
      setLabel1("Şirket İsmi");
      setLabel2("Hakkınızda");
      setDisabled(false)

      axios 
    .get(`https://localhost:44326/TarGet/Producer//${Did}`)
    .then(resp => {
      //setDistricts(resp.data)
    })



    }
    if (Title === "Customer") {
      setLabel1("İsminiz");
      setLabel2("Soyisminiz");
      setDisabled(true)
    }

    /*
    axios
    .get(`https://localhost:44326/TarGet/City`)
    .then(resp =>
      setCities(resp.data)
    )
    console.log(cities)
*/
    axios
    .get(`https://localhost:44326/TarGet/District`)
    .then(resp =>
      setDistricts(resp.data)
    ) 



  }, [Title]);

  const AccountUpdate = () => {
    if (Password == TempPassword) {
      axios
        .put(`https://localhost:44326/TarGet/UserAcc/${UID}`, profile)
        .then((response) => {
          if (response.status == 200) {
            alert(response.status + " status updated");
          }
        })
        .catch((e) => {
          alert(e);
        });
    } else {
      alert("Şifreleriniz uyuşmuyor");
    }
  };

  console.log(UID, Name);

  function  readFileDataAsBase64(e) {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);

     reader.onload= () => {

      let fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: reader.result,
        file: file,
      };


      setImage(reader.result)
        console.log(fileInfo)
    }


    });
  }

  const ProfileUpdate = () => {

    let producer
    
    if(Title =="Producer"){
      producer = {

        p_Name : Name,
        p_Picture: Image,
        p_Description: DescLName,
        p_Address: Adress,
        d_Id: Did,
        p_PostalCode: pCode,
        p_Phone: Phone,
        p_Email: Mail,
        
      }

      
          axios
          .post(`https://localhost:44326/CreateProducer/${UID}`,producer)
          .then(resp => {
            console.log(resp)
      
          })
          .catch(e => {
            console.log(e)
          })
    }

    if(Title == "Customer"){
        producer = {
          c_FName: Name,
          c_LName: DescLName,
          c_Address: Adress,
          d_Id: Did,
          c_PostalCode: pCode,
          c_Phone: Phone,
          c_Email: Mail
        }

        axios
        .post(`https://localhost:44326/CreateCustomer/${UID}`,producer)
        .then(resp => {
          console.log(resp)
    
        })
        .catch(e => {
          console.log(e)
        })


    }
    

    console.log("kerker")


  };

  const handleChange= (event) =>{

    setCity(event.target.value);

    axios 
    .get(`https://localhost:44326/TarGet/District/DistrictByCity/${event.target.value}`)
    .then(resp => {
      setDistricts(resp.data)
      setDid(resp.data.d_Id)
    })
    console.log(districts)

  }
  
  const handleChange2= (event) => {
    setDistrict(event.target.value)
    setDid(event.target.value)
   }

  return (
    <>
      <div className="profile-form">
        <div className="profile-edit">
          <h2>Profil Bilgilerinizi buradan güncelleyebilirsiniz</h2>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={readFileDataAsBase64}
            disabled={disabled}
          />
                <label htmlFor="contained-button-file">
        <Button variant="outline" color="inherit" component="span" disabled={disabled} >
          Resim yükle
        </Button>
        <Button  >Gönder </Button>
        <Button  >Göster </Button>
      
      </label>
          <TextField
            id="standard-basic"
            value={Name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            label={label1}
          />
          <TextField
            id="standard-basic"
            value={DescLName}
            onChange={(event) => {
              setDLN(event.target.value);
            }}
            label={label2}
          />

          <div>
            <Box sx={{ minWidth: 120 ,minHeight: 100}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">İlçe</InputLabel>
                <Select
                  labelId="title-select"
                  id="title-select"
                  value={district}
                  label="İlçe"
                  onChange={handleChange2}
                >
                  {districts && districts.map((data,index) =>
                     <MenuItem value={data.d_Id}>{data.d_Name}</MenuItem>
                  )}
                  
                </Select>
              </FormControl>
            </Box>
          </div>
          <TextField
            id="standard-basic"
            value={Adress}
            onChange={(event) => {
              setAdress(event.target.value);
            }}
            label="Açık Adres"
          />
          <TextField
            id="standard-basic"
            value={pCode}
            onChange={(event) => {
              setpCode(event.target.value);
            }}
            label="Posta Kodu"
          />
          <TextField
            id="standard-basic"
            value={Phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            label="Telefon"
          />
          <Button variant="outlined" onClick={ProfileUpdate}>
            Profili Güncelle !
          </Button>
        </div>
        <div className="account-edit">
          <h2>Hesap Bilgilerinizi buradan güncelleyebilirsiniz</h2>
          <TextField
            id="standard-basic"
            value={Mail}
            onChange={(event) => {
              setMail(event.target.value);
            }}
            label="Email"
          />
          <TextField
            id="standard-basic"
            value={Password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            label="Şifre değiştir"
            type="password"
          />
          <TextField
            id="standard-basic"
            value={TempPassword}
            onChange={(event) => {
              setTempPassword(event.target.value);
            }}
            label="Yeni Şifre Tekrar"
            type="password"
          />
          <Button variant="outlined" onClick={AccountUpdate}>
            Hesap Bilgilerini Güncelle!
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;


/*

değişiklikler uygulandı 
yeni temalar ve düğmeler eklendi 
düğmelerin onClick eventlerine göz atılacak 
OnClick eventleri sadece belirli id ye sahip resmi getirmekte
resmin getirilecek base64 durumundaki bilgisi çeviriliyor 
bu düğmeler veritbanında string olarak kaydedilmekte 
veritabanıdaki geri kalan tabloların attributeları değişmeli 
bu veritabanına istek gönderen endpointler düzenlenicek 
gerekli id ye sahip olan resmin bulunması ve istek gönderilmesi gerekmekte 


           <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Şehir</InputLabel>
                <Select
                  labelId="title-select"
                  id="title-select"
                  value={city}
                  label="Şehir"
                  onChange={handleChange}
                >
                  {cities && cities.map((data,index) =>
                     <MenuItem value={data.cityId}>{data.cityName}</MenuItem>
                  )}
                  
                </Select>
              </FormControl>
            </Box>
          </div>

*/