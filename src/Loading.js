import React from 'react'
import BarLoader from "react-spinners/BarLoader";
const Loading = ({loading}) => {
  return (
    <div>
        <BarLoader color="#36d7b7" loading={loading}  cssOverride={{display:"block"}} 
        size={1080} width={"100vw"}  speedMultiplier={2} />
    </div>
  )
}

export default Loading