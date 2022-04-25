import React, { createContext, useContext, useEffect, useState } from 'react'

const Coin = createContext();

const CoinContext = ({children}) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "RUB") setSymbol("₽");
  }, [currency]);
  
  return (
    <Coin.Provider value={{currency, setCurrency, symbol}}>
      {children}
    </Coin.Provider>
  );
};

export default CoinContext;

export const CoinState = () => {
  return useContext(Coin);
}