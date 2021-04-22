import React from 'react';
// import { useContext } from 'react'
// import {RowContext} from '../context';
// import Loading  from '../components/Loading';

import TabBar from '../components/TabBar';


export default function Home({rows}){
    // const {loading} = useContext(RowContext);
    // let [rows] =useState([]);
    // console.log(props);
    // console.log('sheet id',process.env.REACT_APP_SHEET_ID);
    // console.log('email',process.env.REACT_APP_CLIENT_EMAIL);
    // console.log("private key",process.env.REACT_APP_PRIVATE_KEY);
    // return <>
    //     <div>
    //     {loading? <Loading />:<TabBar />}
    //     </div>
    // </>;
    return <>
        <div>
        <TabBar />
        </div>
    </>;
}