import React from 'react';
import Wolf from '../images/wolf_head.gif';
export default function About(){

    return <>
        <div style={{backgroundColor:"black","color":"#fff"}}>
        <center>
            <h4>Hello i am loknath, currently this page is not completed</h4>
            <p> here are some links if you want to react out to me </p>
            <ul>
                <li>
                    <a href="https://github.com/loknath998"> Git Hub</a>
                </li>
                <li>

                    <a href="https://www.linkedin.com/in/loknath-singh-a3529b194/"> Linked In</a>
                </li>
            </ul>
            <div style={{"width":"100vw"}}>
                <img src={Wolf} alt="wolf head" style={{"width":"25%"}} />
            </div>
        </center>
        </div>
    </>;
}