import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { TransactionContext } from "../context/TransactionContext";
import '../index.css'
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    style={{width:300 , height:40}}
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    // className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

export default function StateTextFields() {
  

const {handleChange , formData , sendTransaction} = React.useContext(TransactionContext);


const handleSubmit = (e) => {
  const { addressTo, amount, keyword, message } = formData;
  console.log(addressTo);
  e.preventDefault();
  
  if (!addressTo || !amount || !keyword || !message) return;
  

  sendTransaction();
};

  return (
    <div style={{display:'flex' , marginTop:'8px' , marginLeft:'28px'}}><Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
  </Box>
    <Stack direction="row" spacing={2} height='40px' marginTop='8px'>
      <Button  variant="contained" onClick={handleSubmit} sx={{color:'black' , backgroundColor:'#8c6ab8'}} endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack></div>
    
    
  );
}
