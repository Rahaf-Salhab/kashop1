import { Button } from '@mui/material'
import React from 'react'

function Loader() {
  return (
    <Button loading variant="outlined" loadingIndicator="Loading…" >
    Loading...
  </Button>  )

}

export default Loader