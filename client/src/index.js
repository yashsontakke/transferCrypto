import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Card  from './components/Card';
import Grid  from './components/Grid';
import "./index.css";
import Form from "./components/Form";
import { TransactionProvider } from './context/TransactionContext';
import Transactions from './components/Transactions';


ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <TransactionProvider>
          <Navbar />
          <Card/>
          <Grid/>
          <Form/>
          <Transactions/>
      </TransactionProvider>
     
    </StyledEngineProvider>
  </React.StrictMode>
);

