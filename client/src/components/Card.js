import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Address from './Address'
import  {useContext} from 'react';
import { TransactionContext } from '../context/TransactionContext';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const {connectWallet , currentAccount} = useContext(TransactionContext);
 
  return (
<div style={{display:'flex' , width:'100vw'  , marginRight:5 }}>

        <Card sx={{ minWidth: 275 , width:1500 , backgroundColor:'#190a2e' , borderRadius:0}}>
        <CardContent >
        
            <Typography variant="h5" component="div" color='white'>
            Send Crypto across the world 
            </Typography>
            <Typography sx={{ mb: 1.5 }}  color='#8c6ab8'>
            Explore the crypto world , Buy Sell cryptocurrency easily on beingyash.eth
            </Typography>
            
        </CardContent >
        <CardActions>
          {!currentAccount && <Button  variant="contained" sx={{color:'black' , backgroundColor:'#8c6ab8' }} onClick={connectWallet}>
        Connect Wallet
      </Button>}
          {currentAccount && <span style={{color:'white'}}> Connected Account : {currentAccount}</span>}
        </CardActions>
        
        </Card>

        {/* <Address sx={{ marginLeft: 200}}/> */}

</div>
     
   
  );
}