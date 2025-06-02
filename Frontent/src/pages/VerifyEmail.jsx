
import { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const VerifyEmail = () => {
  const params = useParams()
  const { verifyEmail } = useAuthStore()

  const [sucessMessage, setSucessMessage] = useState("")

  useEffect(()=>{

  },[sucessMessage])

  const verify = async () => {
    try {
      const res = await verifyEmail(params.id)
      if(res?.statusCode == 200) {
        setSucessMessage(res.message)        
      }      
    } catch (error) {
      console.log("Verification failed", error);
    }
  }

  return (
    <Fragment>
      {sucessMessage ? (
        <div>
          <h1>User Verified Sucessfully.</h1>
        </div>
      )
     : (
        <button className='btn' onClick={verify}>Verify Now</button>
      )}
    </Fragment>
  )
}

export default VerifyEmail