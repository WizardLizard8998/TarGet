import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import TAppBar from "../COMPONENTS/AppBar";

import ContactUs from "./ContactUs";
import MainPage from "./MainPage";
import Login from "./Login";
import Profile from "./Profile";

import UploadButtons from "../COMPONENTS/UploadButton";
import SignUp from "./SignUp";
import ContactForm from "./ContactUs";

import Footer from "../COMPONENTS/Footer";
import Account from "./Account";
import CategoryPage from "./CategoryPage";
import ProducerPage from "./ProducersPage";
import CartPage from "./CartPage";
import Blog from "./Blog";
import LogOut from "./LogOut";


export default function RouterPage() {
  return (
    <Router>
      <div>
      <TAppBar/>
       
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route> 
          <Route exact path="/Anasayfa">
            <MainPage />
          </Route>
          
          <Route exact path="/Kayıt">
            <SignUp />
          </Route>
          <Route exact path="/Giriş">
            <Login />
          </Route>
          <Route exact path="/Çıkış">
            <LogOut />
          </Route>
          

          <Route exact path="/BizeUlaşın">
            <ContactUs />
          </Route>
          <Route exact path="/üreticiProfil">
            <Profile />
          </Route>
          <Route exact path="/bizeUlaşın">
            <ContactForm/>
          </Route>
          <Route exact path="/üreticiHesabı">
            <Account />
          </Route>
          <Route exact path="/kullanıcıProfil">
            <Profile />
          </Route>
          

          <Route exact path="/Üreticiler">
            <ProducerPage/>
          </Route>

          <Route exact path="/Sepet">
            <CartPage />
          </Route>
          
          <Route exact path="/Meyve">
            <CategoryPage category={2} />
          </Route>
          <Route exact path="/Sebze">
            <CategoryPage category={3}/>
          </Route>
          <Route exact path="/Kuruyemiş">
            <CategoryPage category={4}/>
          </Route>

          <Route exact path="/Blog">
            <Blog />
          </Route>
          
          <Route exact path="/deneme">
            <UploadButtons/>
          </Route>

        </Switch>

      
        <Footer/>

      </div>
    </Router>
  );
}


//<Footer/>