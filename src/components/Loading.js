import React from 'react';
import loadImg from '../images/loading-arrow.gif';


export default function Loading(){

    return <div className="loader">
            <div className="loader-text">
                <h3>....Fetching quotes</h3>
            </div>
            <div className="loader-img">
                <img src={loadImg} alt="loading" />
            </div>
    </div>
}