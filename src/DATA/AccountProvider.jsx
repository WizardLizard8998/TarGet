import { createContext, useState } from "react";
import React from "react";
import axios from "axios";

const AccountContext = createContext();

function AccountProvider(props) {
  const [Mail, setMail] = useState("");
  const [Password, setPassword] = useState("");
  const [Title, setTitle] = useState("");
  const [UID, setUID] = useState();

  const [Name, setName] = useState("");
  const [Adress, setAdress] = useState("");
  const [Did, setDid] = useState("");
  const [pCode, setpCode] = useState("");
  const [Phone, setPhone] = useState("");

  const [DescLName, setDLN] = useState("");
  const [Image, setImage] = useState([]);

  return (
    <AccountContext.Provider
      value={{
        Mail: Mail,
        Password: Password,
        Title: Title,
        UID: UID,

        Name: Name,
        Adress: Adress,
        Did: Did,
        pCode: pCode,
        Phone: Phone,

        DescLName: DescLName,
        Image: Image,

        setMail,
        setPassword,
        setTitle,
        setUID,

        setName,
        setAdress,
        setDid,
        setpCode,
        setPhone,
        setDLN,
        setImage,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
}

export { AccountContext, AccountProvider };
