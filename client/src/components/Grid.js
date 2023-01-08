import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow1() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <Item className='purple'>Reliability</Item>
      </Grid>
      <Grid item xs={4}>
        <Item className='purple'>Security</Item>
      </Grid>
      <Grid item xs={4}>
        <Item className='purple'>Ethereum</Item>
      </Grid>
    </React.Fragment>
  );
}
function FormRow2() {
    return (
      <React.Fragment>
        <Grid item xs={4} >
          <Item className='purple'>Web3.0</Item>
        </Grid>
        <Grid item xs={4}>
          <Item className='purple'>Low Fees</Item>
        </Grid>
        <Grid item xs={4}>
          <Item className='purple'>Blockchain</Item>
        </Grid>
      </React.Fragment>
    );
  }
export default function NestedGrid() {
  return (
    <>
    <Box sx={{ flexGrow: 1 , paddingBottom:1 , backgroundColor:"#190a2e" , borderRadius:0}}>
      <Grid container spacing={1}  >
        <Grid container item spacing={3}>
          <FormRow1 sx={{ backgroundColor:"#190a2e"}} />
        </Grid>
      </Grid>
    </Box>
    <Box sx={{ flexGrow: 1 , paddingBottom:1 , backgroundColor:"#190a2e"}}>
      <Grid container spacing={1} >
        <Grid container item spacing={3}>
          <FormRow2/>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}
