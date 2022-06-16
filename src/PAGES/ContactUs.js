import { TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
//import emailjs from 'emailjs-com';
import "react-toastify/dist/ReactToastify.min.css";
import "../Styles/ContactUs.css";
import { Button } from "@mui/material";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      // Use emailjs to email contact form data
      /*await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );
        */
      // Reset contact form fields after submission
      reset();
      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    setAb(5);
    console.log(ab);
  };
  const [ab, setAb] = useState();

  return (
    <>
      <div className="abc">
      <h1 className="text-center">TarGet Contact Us</h1>
        <TextField
          id="standard-basic"
          value={ab}
          onChange={(event) => {
            setAb(event.target.value);
          }}
          label="Name"
        />
        <TextField
          id="standard-basic"
          value={ab}
          onChange={(event) => {
            setAb(event.target.value);
          }}
          label="Email Address"
        />
        <TextField
          id="standard-basic"
          value={ab}
          onChange={(event) => {
            setAb(event.target.value);
          }}
          label="Subject"
        />
        <TextField
          id="standard-basic"
          
          value={ab}
          onChange={(event) => {
            setAb(event.target.value);

          }}
          
          label="Message"
        />
        <Button variant="outlined" onClick={onClick}>
          Kayıt Ol!
        </Button>
      </div>
      
    </>
  );
};

export default ContactForm;
