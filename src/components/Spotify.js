import { Grid } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'

function Spotify() {
    return (
        <Grid>
            <Grid className='spotify__body'>
                <Sidebar />
                <Grid className='body'>
                    <Navbar />
                    <Grid className='body__contents'>
                        <Body />
                    </Grid>
                </Grid>
            </Grid>

            <Grid className='spotify__footer'>
                <Footer />
            </Grid>
        </Grid>
    )
}

export default Spotify