import * as React from 'react';
import Grid from '@mui/material/Grid';


import LeaderCard from './ImageCard';

export default function NftGrid(props:any) {


  return (
      
    <Grid sx={{ flexGrow: 1, marginTop:"0px", marginBottom:"0px" }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>

          {
    
          props.props.map((value:any) => (
            <Grid key={value.mint} item>
              <LeaderCard
                handle = {value.mint}
                isActive = {true}
                name = {value.name}
                image = {value.myRes}
                onBet = {props.onBet}
                attributes = {value.attributes}
              />
            </Grid>


          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        
      </Grid>
    </Grid>
  );
}
