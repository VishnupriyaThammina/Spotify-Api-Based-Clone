import React,{useEffect} from 'react'
import '../assets/scss/pages/_spotify-home-page.scss'
import { Grid, List, ListItem, Typography,Skeleton } from '@mui/material'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import reducer from '../utils/reducer';
import { reducerCases } from '../utils/Constants';

export default function CurrentTrack() {
    const[{token, currentlyPlaying},dispatch] = useStateProvider();
 
    useEffect(()=>{
        const getCurrentTrack = async()=>{
            const res = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers:{
                    Authorization:"Bearer "+token,
                    "Content-Type":"application/json",
        
                }
            });
         if(res.data !==""){
            const {item} = res.data;
        const currentlyPlaying ={
id:item.id,
name: item.name,
artists:item.artists.map(artist=>artist.name),
image:item.album.images[2].url

            }
            dispatch({type:reducerCases.SET_CURRENT_TRACK,currentlyPlaying});
            console.log(currentlyPlaying)
            console.log(res)
         }
        }
        getCurrentTrack();
    


            },[token,dispatch])
 
    return (
        <>
        {currentlyPlaying ?(
            <Grid display="flex" style={{}}>
        <img src={currentlyPlaying.image} />
        <Grid><Typography style={{color:"white"}}>{currentlyPlaying.name}</Typography>
        <Typography style={{color:"gray"}} >{currentlyPlaying.artists.join(", ")}</Typography>
            </Grid>
         </Grid>)  
    
 :(<Grid container display="flex" flexDirection="row" style={{marginTop:"1vh",justifyContent:"center", alignItems:"center",height:"50%",width:"25%"}} spacing={2} >
      <Grid item style={{   background:"#191414"}}>
        <Skeleton variant="rectangular" width={40} height={40} />
      </Grid>
      <Grid item>
        <Typography variant="h6" disply="flex" style={{justifyContent:"center"   , alignItems:"center",color:"gray"}}>
          No Track Playing
        </Typography>
      </Grid>
    </Grid>)}
    </> 
  )
}
