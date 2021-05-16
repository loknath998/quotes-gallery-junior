/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useState,useEffect} from 'react';

import {GoogleSpreadsheet} from 'google-spreadsheet';

const RowContext = createContext();


function RowProvider({children}){

    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState([]);
    let [loading, setLoading] = useState(true);
    let [new_quote,setNewQuote] = useState({
        quote:"",
        quoter:"",
        category:""
    });
    function updateQuote(event){
        const {name,value} = event.target;
        setNewQuote((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        });
    }
    async function getSheets(){
    
      const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
    
      await doc.useServiceAccountAuth({
        client_email:process.env.REACT_APP_CLIENT_EMAIL,
        private_key:process.env.REACT_APP_PRIVATE_KEY
      });
    
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
    //   console.log('rows are:' ,rows);
      setRows(rows);
      updateCategories(rows);
      setLoading(false);
    }
    useEffect(()=>{
        getSheets();
    //   setLoading(false);
    },[]);
    
    async function updateCategories(rows){
      let ar = rows.map((item)=>item.category);
      ar = [...new Set(ar)];
      setCategories(ar);
    } 
    async function addNewRow(){
        if(new_quote.quote !== "" && new_quote.quoter !== "" && new_quote.category !== "")
        {
            setLoading(true);
            const doc = new GoogleSpreadsheet(process.env.REACT_APP_SHEET_ID);
            // console.log('sheet id',process.env.REACT_APP_SHEET_ID);
            // console.log('client mail',process.env.REACT_APP_CLIENT_EMAIL);
            console.log('private key',process.env.REACT_APP_PRIVATE_KEY);
            await doc.useServiceAccountAuth({
                client_email:process.env.REACT_APP_CLIENT_EMAIL,
                private_key:process.env.REACT_APP_PRIVATE_KEY
            });
            
            await doc.loadInfo();
            console.log('doc:',doc);
            const sheet = doc.sheetsByIndex[0];
            console.log('sheet:',sheet);
            const rows1 = await sheet.getRows();
            console.log('rows1',rows1);
            await sheet.addRow({
                quotes:new_quote.quote,
                quoter:new_quote.quoter,
                category:new_quote.category
            });
            const rows = await sheet.getRows();
            setRows(rows);
            await updateCategories(rows);
            setNewQuote({
                quote:"",
                quoter:"",
                category:""
            });
            setLoading(false);
        }
        else
        {
            alert("Please conside filling all fields");
        }
    }


    return (
        <RowContext.Provider value={{loading,rows,categories,new_quote,updateQuote,addNewRow}}>
            {children}
        </RowContext.Provider>
    );

}
const RowConsumer = RowContext.Consumer;
export {RowContext, RowProvider,RowConsumer };