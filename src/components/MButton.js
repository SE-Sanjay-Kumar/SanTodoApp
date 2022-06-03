import React from 'react'
import Button from '@mui/material/Button'



const MButton = (props) => {
    
  return (
    <>
      <Button
      value={props.value}
      fullWidth = {(props.fullWidth===false)? false: true}
      variant="contained"
      onClick={props.onClick}
      style={{backgroundColor: "#584063"}}
      >{props.buttonName}</Button>
    </>
  )
}

export default MButton
