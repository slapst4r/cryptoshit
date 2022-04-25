import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from "./comp/Header";
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@mui/styles';

function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();


  return (
    <BrowserRouter>
    <div className={classes.App}>
      <Header />
      <Route path="/" component={Homepage} exact/>
      <Route path="/coins/:id" component={CoinPage} />
    </div>
    </BrowserRouter>
  );
}

export default App;
