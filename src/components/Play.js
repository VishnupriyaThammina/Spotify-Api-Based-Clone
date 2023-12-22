import React,{useEffect} from 'react'
import '../assets/scss/pages/_spotify-home-page.scss'
import { Grid, List, ListItem } from '@mui/material'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import reducer from '../utils/reducer';
import { reducerCases } from '../utils/Constants';
export default function Play() {
    const[{token, playlists},dispatch] = useStateProvider();
    useEffect(()=>{
const dataPlaylist = async()=>{
    const res = await axios.get("https://api.spotify.com/v1/me/playlists",{
        headers:{
            Authorization:"Bearer "+token,
            "Content-Type":"application/json",

        }
    });
   const {items} = res.data
const playlists = items.map(({name,id})=>{return {name,id}})
dispatch({type:reducerCases.SET_PLAYLISTS,playlists});
}
dataPlaylist();
    },[token,dispatch])
    
const changePlaylist=(selectedPl)=>{
dispatch({type:reducerCases.SET_PLAYLIST_ID,selectedPl});

}

  return (
    <Grid className='scroll' style={{margin:"1.5vh"}}>
<List className='gray '>
    {
        playlists.map(({name,id})=>{
            return(
                <ListItem className='grayHove' key={id} onClick={()=>changePlaylist(id)}>
{name}
                </ListItem>
            )
        })
    }
</List>
    </Grid>
  )
}
