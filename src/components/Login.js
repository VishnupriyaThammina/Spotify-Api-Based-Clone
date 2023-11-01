import { Button, Grid } from '@mui/material'
import React from 'react'

export default function Login() {
const handleClick=()=>{
   const clientId ="12326063bac545b68ab9683076e9c800"
   const redirectUrl = "http://localhost:3000/"
   const apiUrl ="https://accounts.spotify.com/authorize"
   const scope = ["user-read-email","user-read-private","user-read-playback-state","user-modify-playback-state","user-read-currently-playing","user-read-playback-position"
   ,"user-top-read"
   ,"user-read-recently-played"]
   window.location.href= `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
    " "
  )}&response_type=token&show_dialog=true`;
    }
  return (
    <Grid display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{width:"100vw", height:"100vh", backgroundColor:"#1db954"}}>
-<Grid item>
    <img style={{maxWidth:"50vh",minWidth:"2vh"}} src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png'/>
</Grid>
<Grid>
    <Button sx={{  color: 'white',
    backgroundColor: 'black',
    transition: "0.3s",
    paddingInline: '20px',
    borderRadius: '50px',"&:hover":{
        backgroundColor:"white",color:"black",border:"none"
    }
   }} variant="contained" onClick={handleClick}>
        Connect Spotify
    </Button>
</Grid>
    </Grid>
  )
}
