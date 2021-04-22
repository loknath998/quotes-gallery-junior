import React from 'react';
// import {useState,useEffect} from 'react';
// import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Heading(){

    // let [link,setLink] = useState('/about');
    // let [link_text,setLinkText] = useState('About me');
    // useEffect(()=>{
    //     const location = useLocation();
    //     if(location.pathname !== '/about')
    //     {
    //         setLink('/about');
    //         setLinkText("About me");
    //     }else{
    //         setLink('/');
    //         setLinkText('Back');
    //     }
        
    // });

    // console.log(location);

    return <>
        <div className="heading">
            <div></div>
            <h1>
                <Link to="/">
                    Quote Gallery Junior
                </Link>
            </h1>
            <div className="button-link">
                <Link to="/about">About me</Link>
            </div>
        </div>
    </>;
}