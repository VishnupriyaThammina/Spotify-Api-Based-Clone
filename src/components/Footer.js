import { Grid } from '@mui/material'
import React from 'react'
import CurrentTrack from './CurrentTrack'
import PlayerControl from './PlayerControl'


export default function Footer() {

  return (
    <Grid item display="flex" flexDirection="row" style={{ position: "relative", /* Set position to use z-index */
    zIndex: "1",backgroundColor:"black",borderTop:"1px solid #282828" ,boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",     marginBottom:"10vh",width:"100vw",height:"20vh"}}>
<CurrentTrack  />
<PlayerControl />
    </Grid>

  )
}
