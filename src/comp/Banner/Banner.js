import { makeStyles } from '@mui/styles'
import React from 'react'
import { Container, Typography } from '@mui/material';

const useStyles=makeStyles(() => ({
    banner: {
      backgroundColor: "black",
    },
    bannerContent: {
      height: 300,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "30%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    }
}));

const Banner = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
          <div className={classes.tagline}>
            <Typography
            variant="h2"
            style={{
              color: 'white',
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",

            }}>
              Крипта
            </Typography>
          </div>
      </Container>
    </div>
  )
}

export default Banner