import { Typography } from '@mui/material'
import React from 'react' 
import {CgProfile} from "react-icons/cg"
import {FASearch} from "react-icons/fa"
import { useStateProvider } from '../utils/StateProvider'
export default function Navbar() {
  const {userInfo} = useStateProvider();
  return (
    <div>
<span>
  <Typography fontWeight="bold">
    {userInfo?.name}
  </Typography>
</span>
    </div>
  )
}
