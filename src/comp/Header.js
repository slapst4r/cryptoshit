import { AppBar, Container, MenuItem, Toolbar, Typography,Select } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { CoinState } from '../CoinContext';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "black",
    fontFamily: "Montserrat",
    fontWeight: "700",
    cursor: "pointer",
  },
}));

function Header() {
  const classes = useStyles();
  //Состояние валюты
  const { currency, setCurrency } = CoinState();
  //Навигация, возврат на домашнюю
  const history = useHistory();


  return (
    <AppBar color='transparent' position='static'>
      <Container>
        <Toolbar>
          <Typography
           className={classes.title}
           onClick={() => history.push('/')}
           variant="h6"
           fontWeight="bold"
           >
             Crypto market 
          </Typography>
          <Select
            variant="outlined"
            style={{
              width:100,
              height:40,
              marginLeft:15,
            }}
            value = {currency}
            onChange = {(e)=> setCurrency(e.target.value)}
            >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'RUB'}>RUB</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header