import React, { useContext,useEffect } from "react";
import "../Styles/Style.css";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { AccountContext } from "../DATA/AccountProvider";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { Box , FormControl,InputLabel,Select,MenuItem} from "@mui/material"; 


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

//ürün ekleme

function ProducerAccount() {
  const classes = useStyles();

  const { UID, Title } = useContext(AccountContext);

  const [Name, setName] = useState();
  const [Image, setImage] = useState();
  const [Description, setDescription] = useState();
  const [UnitPrice, setUnitPrice] = useState();
  const [Discount, setDiscount] = useState();
  const [TotalWeight, setTotalWeight] = useState();
  const [UnitWeight, setUnitWeight] = useState();
  const [PId, setPId] = useState();
  const [CId, setCId] = useState();

  const [categories,setCategories] = useState();


  useEffect(() => {
    
  axios
  .get(`https://localhost:44326/TarGet/Category`)
  .then(resp => setCategories(resp.data))  
    
    axios
    .get(`https://localhost:44326/UserAcc/${UID}`)
    .then((resp) => {
      setPId(resp.data.p_Id);
      console.log(PId);
    })
    .catch((e) => console.log(e));
  
  }, [])

  let product = {
    Pt_Name: Name,
    Pt_Image: Image,
    Pt_Description: Description,
    Pt_UnitPrice: UnitPrice,
    Pt_Discount: Discount,
    Pt_TotalWeight: TotalWeight,
    Pt_UnitWeight: UnitWeight,
    P_Id: PId,
    C_Id: CId,
  };


  const handleChange2 = (event) => {
    setCId(event.target.value)
  }

  const AddProduct = () => {
    axios
      .post(`https://localhost:44326/TarGet/Products`, product)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => console.log(e));
  };

  function readFileDataAsBase64(e) {
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

      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + " kB",
          base64: reader.result,
          file: file,
        };

        setImage(reader.result);
        console.log(fileInfo);
      };
    });
  }

  const onClick = () => {
    let product = {
      pt_Id: 0,
      pt_Name: "deneme1",
      pt_Image: Image,
      pt_Description: "string",
      pt_UnitPrice: 0,
      pt_Discount: 0,
      pt_TotalWeight: 0,
      pt_UnitWeight: 0,
      p_Id: 1,
      c_Id: 1,
    };

    console.log(product);
    console.log(Image);

    axios
      .post(`https://localhost:44326/TarGet/Products`, product)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="add-product">
        <h1>Hello here you can add product </h1>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={readFileDataAsBase64}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Resim yükle
          </Button>
        </label>
        <TextField
          id="standard-basic"
          value={Name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          label="Ürün İsmi"
        />

        <div>
          <Box sx={{ minWidth: 120, minHeight: 100 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
              <Select
                labelId="title-select"
                id="title-select"
                value={CId}
                label="İlçe"
                onChange={handleChange2}
              >
                {categories &&
                  categories.map((data, index) => (
                    <MenuItem value={data.c_Id}>{data.c_Name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <TextField
          id="standard-basic"
          value={Description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          label="Ürün hakkında"
        />
        <TextField
          id="standard-basic"
          value={UnitPrice}
          onChange={(event) => {
            setUnitPrice(event.target.value);
          }}
          label="Birim/kg Fiyat"
        />
        <TextField
          id="standard-basic"
          value={Discount}
          onChange={(event) => {
            setDiscount(event.target.value);
          }}
          label="İndirim miktarı "
        />
        <TextField
          id="standard-basic"
          value={TotalWeight}
          onChange={(event) => {
            setTotalWeight(event.target.value);
          }}
          label="Toplam Ağırlık "
        />
        <TextField
          id="standard-basic"
          value={UnitWeight}
          onChange={(event) => {
            setUnitWeight(event.target.value);
          }}
          label="Birim Ağırlık "
        />

        <Button onClick={AddProduct}>Ürün Ekle </Button>
      </div>
    </>
  );
}

export default ProducerAccount;
