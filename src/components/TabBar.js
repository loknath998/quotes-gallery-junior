import React,{useContext} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container,Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';

import {RowContext} from '../context';



const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

function Card({quote,quoter,category}){

return <div className="card">
          <div className="quote">
            {quote}
          </div>
          <div className="quoter">
            {quoter}
          </div>
          <div className="category">
            {category}
          </div>
  </div>
}
  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



export default function TabBar(){

    const {rows,categories,new_quote,updateQuote,addNewRow} = useContext(RowContext);
    // alert(rows.length +' && '+categories.length);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    return <>
        <Paper className={classes.root}>
          <Tabs                 
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="secondary"
            // centered 
            variant="scrollable"
            scrollButtons="auto"
            >
            <Tab label="All"  />
            {categories.map((item,index)=>{
              return <Tab key={index} label={item} />
            })}
            <Tab label="Add new quote" className="add-new-quote" />                   
          </Tabs>
        </Paper>
        <Container maxWidth="lg" >
          <TabPanel className="panel" value={value} index={0}  >
            <Grid  container justify="center" spacing={3} >
              {rows.map((item,index)=>{
                return <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                          <Card quote={item.quotes} quoter={item.quoter} category={item.category} />
                </Grid>
              })}
            </Grid>
          </TabPanel>
          {categories.map((item,index)=>{
            return <TabPanel key={index} className="panel" value={value} index={index+1} >
                    <Grid container justify="center" spacing={3}>
                    {rows.filter((item1)=> item1.category === item).map((item2,index2)=>{
                      return <Grid key={index2} item xs={12} sm={6} md={4} lg={3} >
                                <Card quote={item2.quotes} quoter={item2.quoter} category={item2.category} />
                      </Grid>;
                    })}
                    </Grid>
            </TabPanel>
          })}
          <TabPanel className="panel" value={value} index={categories.length +1}>
            <Grid container className="input-form" justify="center" alignItems="center" spacing={1}>
              <Grid item xs={12} sm={9} md={7} lg={7}  >
                <div className="wrapper">
                  <div className="input-data text-area">
                    <textarea type="text" required value={new_quote.quote} 
                        name="quote"  onChange={(event)=>updateQuote(event)} /> 
                    <div className="underline"></div>
                    <label>New Quote</label>
                  </div>
                </div>
              </Grid>
              <Grid item  xs={12} sm={9} md={7} lg={7} >
                <div className="wrapper">
                  <div className="input-data">
                    <input type="text" required value={new_quote.quoter} 
                        name="quoter" onChange={(event)=>updateQuote(event)} /> 
                    <div className="underline"></div>
                    <label>Quoter</label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={9} md={7} lg={7} >
                <div className="wrapper">
                  <div className="input-data">
                    <input type="text" required value={new_quote.category} 
                        name="category" list="categories" onChange={(event)=>updateQuote(event)} />
                        <datalist id="categories">
                          {categories.map((item,index)=>{
                            return <option key={index} >{item}</option>
                          })}
                        </datalist> 
                    <div className="underline"></div>
                    <label>Category</label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={9} md={7} lg={7} >
                <Grid container justify="center">
                    <Grid item xs={12} sm={7} md={6} lg={5} >
                      <button className="button" onClick={addNewRow}>Add New Quote</button>
                    </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
        </Container>
    </>;
}