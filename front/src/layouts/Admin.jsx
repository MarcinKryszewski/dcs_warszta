import React from 'react'
import { Navbar, Sidebar } from '../components/components'
import { Dashboard } from '../pages/pages'

//################TEMP###############

import { Box } from '@mui/material'

//################TEMP###############
 
function Admin() {
  return (
    <div>
    <Sidebar />
    <Box sx={{
      width: 'calc(100% - 260px)',
      float: 'right'
    }}>
      <Navbar />
      <Dashboard />
    </Box>
    </div>
  )
}
export default Admin