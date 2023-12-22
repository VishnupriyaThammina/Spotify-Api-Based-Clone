import { Grid } from '@mui/material'
import React,{useEffect} from 'react'
import '../assets/scss/pages/_spotify-home-page.scss'
import Sidebar from './Sidebar'
import Body from './Body'
import Footer from './Footer'
import axios from 'axios'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constants'
function Spotify() {
    const[{token},dispatch] = useStateProvider();

    useEffect(()=>{
const getUserInfo = async()=>{
    const {data} = await axios.get("https://api.spotify.com/v1/me",{
        headers:{
            Authorization:"Bearer "+token,
            "Content-Type":"application/json",

        }
    })
    const userInfo = {
        userId: data.id,
        userName:data.display_name
    }
    dispatch({type:reducerCases.SET_USER,userInfo})
    
}

getUserInfo();
    },[dispatch,token])
    return (
        <Grid container className='flexCen' style={{height:"99vh"}}>
<Grid container className='flexCol' style={{ width:"99vw",height:"90%"}}>
<Sidebar/>

<Body />
<Grid>
 
</Grid>
</Grid>
<Footer />
        </Grid>
   
    )
}

export default Spotify