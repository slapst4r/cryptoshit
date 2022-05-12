import {  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper, } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../cfg/api';
import { CoinState } from '../CoinContext';
import { useHistory } from 'react-router-dom';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "white",
    cursor: "pointer",
    '&:hover': {
      backgroundColor: "#f2f0f0",
    },
    fontFamily: "Montserrat",
  },
  pagination: {
    color: 'red'
  },
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency, symbol } = CoinState();


  const classes = useStyles();
  const history = useHistory();

  async function fetchCoins() {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));

      setCoins(data);
      setLoading(false);
    } catch (err){
      alert(err);
    };
  };

  //console.log(coins);

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  
  return (
    <Container style={{ textAlign: "center" }}>
    <Typography
      variant="h4"
      style={{ margin: 18, fontFamily: "Montserrat" }}
    >
      Сортировка по капитализации
    </Typography>
    <TextField
      label="Поиск"
      variant="outlined"
      style={{ marginBottom: 20, width: "100%" }}
      onChange={(e) => setSearch(e.target.value)}
    />
    <TableContainer component={Paper}>
      {loading ? (
        <LinearProgress style={{ backgroundColor: "black" }} />
      ) : (
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "black" }}>
            <TableRow>
              {["Монетка", "Цена", "Изменения за 24 часа", "Капитализация"].map((head) => (
                <TableCell
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontFamily: "Montserrat",
                  }}
                  key = {head}
                  align = {head === "Монетка" ? "" : "right"}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <TableRow
                    onClick={() => history.push(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span style={{ color: "darkgrey" }}>
                          {row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(row.current_price.toFixed(2))}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">
                      {symbol}{" "}
                      {numberWithCommas(
                        row.market_cap.toString().slice(0, -6)
                      )}
                      
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </TableContainer>

    {/* Comes from @material-ui/lab */}
    <Pagination
      count={(handleSearch()?.length / 10).toFixed(0)}
      style={{
        padding: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      classes={{ ul: classes.pagination }}
      onChange={(_, value) => {
        setPage(value);
        window.scroll(0, 450);
      }}
    />
  </Container>
  )
}

export default React.memo(CoinsTable);