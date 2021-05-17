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
            console.log('doc::',doc);
            // console.log('sheet id',process.env.REACT_APP_SHEET_ID);
            console.log('client mail\n',process.env.REACT_APP_CLIENT_EMAIL);
            console.log('private key');
            console.log(process.env.REACT_APP_PRIVATE_KEY);
            await doc.useServiceAccountAuth({
                client_email:process.env.REACT_APP_CLIENT_EMAIL,
                private_key:"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCQGOSil/hxYq/v\nsRnDLyIaQfU11b3GqsPcMYY3fpwcfCXnY1pkmoyY874f6seFTHRBql0sIeUpXLgk\ntanLzcAnxA7TbBG/BPXlGtBlRsjRNCOUqRq7W95XMGTrTb6PVGXSiGUtBkrJaOOB\n1Q1WkqFFw3WigV4d6uv8Jj+X+2wVjt3XhMFOpquGukC5kjMclTfLUo8R6nDT1W9E\n0T9SGeCIbLzRNdtSTFeZ7FG/i7A/F+WN2ABeQC7W6mpVzeOuvBCnFgXmhkb+4R0W\nBdkUiF5SyR8NF1qo3PfCSUj8ZYr4Isn3CpboJDCZsyImnutFlWYO0DRv9oasoTub\n/MslMvF5AgMBAAECggEAPcrvAOq6l6UCXX9M1O65aRkv1k46e59vLlXugI3C1FRI\nzNlGQi4kbNLZjUZZGUiX8jDkk7BVXU9tiBB/J+6roGHrGa8WTRwLdpvxEf0w0MXT\nHEUIOaBD0I/oNx+3wC8pGwdym8Q+/fAE4ABFIALxNcGECJQBkELVv+OHEd23k+Zz\nXMQk+JQ3m1rpg2Z7USZyu7x+1X/OMC5IaxLUJ/XjOA19y8AFt3I3ca/gZkk6O72v\nHh1/EdwaZM8bbMQ7BlXA5kVQAurXn0MKY4itRPgDa/PXtMGNAHY7FEmVMYrEVk8K\ns0R0K1sCfCS85DpnoZVdCvdR7j6nl6wTAdq0k+MWoQKBgQDGKs88krAAFmvtlgLg\nIVI+uQ6i1GSzq3bkvc6zkmRtoNZesLpFq7d4H8Hg3AbE5JYF+eL4FBF5/cfpyYaC\nUMnlSW07i8N0ZjY4XcbwvgWSpmXxj9icTrxzvnR1/Ba273GCd0kWV5d9lA0ynQ29\nEDANDOiLaVhtoMiKeR/OQlUMDwKBgQC6JnukY/75tRMJCxMpX/R0R0AcLAuk9tkt\n96QJpYdwAi3jeMA3gTLetoKY6Y2DdyWXU7b4jiSvJ+VcOOqLBsijpCSdrom9lwpE\noes+M+vfrVdpdSUTmByfBxFwvbP+gjZoV+cJWPSifN/JappTxjhl5x7/nsT1Wqkn\npS32jyPB9wKBgQCHXr0cktP561clAKHMO9b0E/SElPSJq+rXDTZDgxBpt0JZgv5s\nE4aMX51Qnt1c6Q323SIH96WMoSlMcicZpFiW8dbVo38MZ7pIPP9me1hROqxPHMWK\n2Vpw8ryZ0HAv3Ve8GQJracCJv3ZYieLVsVYxxAyjF36ZvQjhVya7/qIcTwKBgCCh\nXksSvD9JXmzXZCR8jX1UgAhwMBpaqvdD0Z1fRr57o0+cexU/sIsZswra5dOFrzE3\nm3s2b3fEpo/j6jk0lzcYLtL1JW/2afZd676bm106JXh28Gje4SV/N69rkYGrkZ34\nyqb40Okquo+0ABlvRbOXL/fe/OeFXOF2MvhlXv9BAoGBAKT4ZdJh5W31PMnqwbdn\neB2tYsx74+dvEB2h81dpakc/o6ioyUnnwkKND14SIzG9B/4lkmoil/4y9DS6dxWV\ns67sICetjI1RyfQiyQA7LYtk8MklDR4H7Vd12PP2TV9Euxv14p12oLinkc5HUbIT\nIK1XRbbmbEwD0yFDNTHuugnK\n-----END PRIVATE KEY-----\n"
                // private_key:process.env.REACT_APP_PRIVATE_KEY
            });
            
            console.log('use Service Account method executed');
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