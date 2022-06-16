import "../Styles/Hakkımızda.css"
import target from "../DATA/IMAGES/Biber.jpg";

import React, { Component } from 'react'


function Hakkımızda() {
    
    return(
        <div class="section">
        <div class="container">
            <div class="content-section">
                <div class="title">
                    <h1>About Us</h1>
                </div>
                <div class="content">
                    <h3>Lorem ipsum dolor sit amet, consectetur adipisicing</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.</p>
                    <div class="button">
                        <a href="">Read More</a>
                    </div>
                </div>

            </div>
            <div class="image-section">
                <img src={target}></img> 
            </div>
        </div>
    </div>
    )
}

export default Hakkımızda;