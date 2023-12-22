import { Grid, Typography } from '@mui/material'
import React from 'react'
import  '../assets/scss/pages/_spotify-home-page.scss'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled,MdSearch} from 'react-icons/md'
import Play from './Play.js';
export default function Sidebar() {
  return (
    <Grid container className='flexRow' style={{width:"28%",height:"96%"}}>
    
    <Grid item  style={{backgroundColor:"hsla(0, 0%, 12%, 0.847)",borderRadius:"10px",width:"97%",height:"18%"}}>
    <List>
      <ListItem  className="white grayHove">
        <MdHomeFilled />
        <Typography variant="body1" fontWeight="bold" style={{marginLeft:"1vh"}}>
          Home
        </Typography>
      </ListItem>
      <ListItem  className="gray grayHove">
        <MdSearch  />
        <Typography variant="body1" fontWeight="bold" style={{marginLeft:"1vh"}}>
          Search
        </Typography>
      </ListItem>
    </List>
    </Grid>
    <Grid item className='scroll1' style={{backgroundColor:"hsla(0, 0%, 12%, 0.847)",borderRadius:"10px",marginTop:"1.5vh",width:"97%",height:"83%"}}>
    <List>
      <ListItem className="gray grayHove" >
        <IoLibrary  />
        <Typography variant="body1" fontWeight="bold" style={{margin:"1.5vh"}}>
          Your Library
        </Typography>
      </ListItem>
    <Play />
    </List>
    </Grid>
    </Grid>
  )
}
