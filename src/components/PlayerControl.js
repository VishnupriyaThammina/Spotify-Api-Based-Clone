import { Typography,Grid } from '@mui/material'
import React from 'react'
import { reducerCases } from '../utils/Constants';
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle, BsFillCircleFill} from "react-icons/bs"
import {CgPlayTrackNext,CgPlayTrackPrev} from "react-icons/cg"
import { useStateProvider } from '../utils/StateProvider'
import {FiRepeat} from "react-icons/fi"
import axios from 'axios'
export default function PlayerControl() {
    const[{token,playerState,currentlyPlaying},dispatch] = useStateProvider();
    const changeTrack =async(type)=>{
      await axios.post(`https://api.spotify.com/v1/me/player/${type}`,{},{
        headers:{
            Authorization:"Bearer "+token,
            "Content-Type":"application/json",

        }
    });
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
  dispatch({type:reducerCases.SET_CURRENT_TRACK,currentlyPlaying});}
  else
 
    dispatch({type:reducerCases.SET_CURRENT_TRACK,currentlyPlaying:null});

    }

    const changeState=async()=>{
      const state = playerState?"play":"pause";
      const res = await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{},{
        headers:{
            Authorization:"Bearer "+token,
            "Content-Type":"application/json",
  
        }
    });
  dispatch({type:reducerCases.SET_PLAYER_STATE,playerState: !playerState});}
    
    
  return (
<Grid display="flex" style={{justifyContent:"center",alignItems:"center", height:"70%", width:"100%",color:"white"}}>
<Grid item><BsShuffle style={{color:"white", width:"20px" ,height:"20px"}} /></Grid>
<Grid item><CgPlayTrackPrev onClick={(()=>changeTrack("previous"))} style={{color:"white", width:"60px" ,height:"25px"}}/></Grid>
<Grid item>
    {playerState? <BsFillPlayCircleFill  onClick={(()=>changeState())}  style={{color:"white", width:"30px" ,height:"30px"}}/>:<BsFillPauseCircleFill onClick={(()=>changeState())} style={{color:"white", width:"30px" ,height:"30px"}}/> }
</Grid>
<Grid item>
    <CgPlayTrackNext onClick={(()=>changeTrack("next"))} style={{color:"white", width:"60px" ,height:"25px"}}/>
</Grid>
<Grid item>
    <FiRepeat style={{color:"white", width:"20px" ,height:"20px"}}/>
</Grid>
</Grid>
  )
}
