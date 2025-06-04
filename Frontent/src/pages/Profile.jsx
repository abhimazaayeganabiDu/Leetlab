import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

const Profile = () => {
    const {userProfile, getProfile} = useAuthStore()

    console.log("user profile", userProfile);
    
    useEffect(()=> {
        getProfile()                                               
    }, [])

  return (
    <div>Profile</div>
  )
}

export default Profile