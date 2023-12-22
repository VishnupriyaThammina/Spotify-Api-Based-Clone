import React, { useEffect,useState } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import Navbar from './Navbar';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import axios from 'axios';
import Foot from './Foot';

export default function Body() {
  const [{ token, selectedPl, selectedPlaylist,playerState,currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const initPlaylist = async () => {
      try {
        const res = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPl}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // console.log(res)

        const formattedPlaylist = {
          id: res.data.id,
          name: res.data.name,
          desc: res.data.description.startsWith('<a') ? '' : res.data.description,
          image: res.data.images[0].url,
          tracks: res.data.tracks.items.map(({ track }) => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map((artist) => artist.name),
            image: track.album.images[2].url,
            duration: track.duration_ms,
            album: track.album.name,
            context_uri: track.album.uri,
            track_number: track.track_number,
          })),
        };
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: formattedPlaylist });
      } catch (error) {
        console.error('Error fetching playlist:', error);
        // Handle the error appropriately
      }

    };
    initPlaylist();

  }, [token, dispatch, selectedPl]);
  const formatDuration = (durationInMilliseconds) => {
    const minutes = Math.floor(durationInMilliseconds / 60000);
    const seconds = ((durationInMilliseconds % 60000) / 1000).toFixed(0);
  
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  };

  const playTrack=async(id,name,artists,image,context_uri,track_number)=>{
    const response=await axios.put(`https://api.spotify.com/v1/me/player/play`,{
      uris: [`spotify:track:${id}`],
      position_ms:0,
    },{
      headers:{
          Authorization:"Bearer "+token,
          "Content-Type":"application/json",

      }
  });
  if(response.status===204){
    const currentlyPlaying={
      id,name,artists,image,
    };
    dispatch({type:reducerCases.SET_CURRENT_TRACK,currentlyPlaying})
    dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:false})
    console.log("Track is playing...");
  }

else {
  console.log("Error playing track:", response);
  dispatch({type:reducerCases.SET_PLAYER_STATE,playerState:true})

}
console.log(dispatch); // Check if this logs a function

// Check reducerCases
console.log(reducerCases); // Ensure these match the cases in your reducer

// Check if token and selectedPlaylist are defined
console.log(token, selectedPlaylist);
}
  
  
  return (
    <Grid
      item
      style={{
        borderRadius: '10px',
        background: 'linear-gradient(rgba(34, 34, 94, 0.664),#191414)',
        overflowY: 'auto',
        marginTop: '3vh',
        width: '72%',
        height: '100%',
      }}
    >
      <Navbar />
      <Grid style={{ overflowY: 'auto' }}>
        {selectedPlaylist && (
          <>
            <Grid container>
              <Grid item display="flex" flexDirection="column" style={{alignItems:"center" ,justifyContent:"center",color: 'white' ,width:"100%" }}>
                <Grid container style={{ boxShadow:'rgba(0, 0, 0, 0.2) 0px 20px 30px', height:"50vh"}}>
                  <Grid item container>
                  <Grid item display="flex" flexDirection="column" style={{justifyContent:"center",alignItems:"center",width:"30%"}}>
                  <img src={selectedPlaylist.image} alt="selected playlist"  style={{width:"250px",height:"250px",borderRadius:"5px",boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}}/>
                  </Grid>
                  <Grid item display="flex" flexDirection="column" style={{justifyContent:"center",width:"70%"}} >
                  <Grid item display="flex" flexDirection="column" style={{ height:"60%",width:"100%",justifyContent:"flex-end",alignItems:"right"}}>
                <Typography variant="body2" style={{color:"white"}}>Playlist</Typography>
                  <Typography variant="h2" fontWeight="bold">{selectedPlaylist.name}</Typography>
                  <Typography variant="body1">{selectedPlaylist.desc}</Typography>
                </Grid>
                  </Grid>
                
                </Grid>
                </Grid>
             
                <Grid style={{ color: 'white' ,width:"95%" }}>
                 
                  <List style={{}}>
  {selectedPlaylist && selectedPlaylist.tracks.map(({ id, name, image, artists, album, duration,track_number,context_uri },index) => (
    <ListItem key={id} style={{cursor:"pointer"}} onClick={()=>playTrack(id,name,artists,image,context_uri,index)}>
      <ListItemText style={{color:"gray",width:"2%"}}>{index+1}</ListItemText>
      <ListItemAvatar>
        <Avatar src={image} alt={`${name} cover`} style={{ borderRadius: "3px" }} />
      </ListItemAvatar>
      <ListItemText style={{ width: "30%" }}>
        <Typography variant="body1" fontWeight="bold" style={{ color: 'white' }}>{name}</Typography>
        <Typography variant="body2" style={{ color: 'gray' }}>{album}</Typography>
      </ListItemText>
      <ListItemText style={{width:"40%"}}>
      <Typography variant="body2" style={{ color: 'gray' }}>{artists.join(', ')}</Typography>
      </ListItemText>
      <ListItemText style={{ width: "20%", textAlign: "right" }}>
        <Typography style={{ color: 'gray' }}>{formatDuration(duration)}</Typography>
      </ListItemText>
    </ListItem>
  ))}
</List>

                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      <Foot />

      </Grid>
    </Grid>
  );
}
