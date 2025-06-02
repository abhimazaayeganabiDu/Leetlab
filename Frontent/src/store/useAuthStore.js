import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import { ErrorIcon, toast } from 'react-hot-toast'
import axios from 'axios'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSinginUp: false,
    isLoginUp: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const {data} = await axiosInstance.get("/auth/check")            
            set({ authUser: data })
        } catch (error) {
            console.log("Error checking auth", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSinginUp: true })
        try {
            const res = await axiosInstance.post("/auth/register", data)
            set({ authUser: res.data })
            toast.success(res.data?.message)
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error signing up")
        } finally {
            set({ isSinginUp: false })
        }
    },

    verifyEmail: async (token) => {
        try {
            const { data } = await axiosInstance.get(`/auth/verify-email/${token}`)
            toast.success(data.message)
            return data
        } catch (error) {
            console.log("Error verifying Email", error);
            toast.error("Email not verified.")
        }
    },

    resendVerifyEmail: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/resend-verify-email", data)
            toast.success(res.message)
        } catch (error) {
            console.log("Error in resend verification Email", error);
            toast.error("Not send email.")
        }
    },

    login: async (data) => {
        set({ isLoginUp: true })
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data })
            toast.success(res.data?.message)
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in")
        } finally {
            set({ isLoginUp: false })
        }
    },

    forgotPassword: async (data) => {
        try {
            const res = await axiosInstance.post("/auth/reset-password-request", data)
            toast.success(res.message)
        } catch (error) {
            console.log("Error forgotPassword", error);
            toast.error("Error in forgotPassword")
        }
    },

    resetForgotPassword: async (data, token) => {
        try {
            const res = await axiosInstance.post(`/reset-password/${token}`, data)
        } catch (error) {
            console.log("Error in reset Password.");
        }
    },

    changePassword: async (data) => {
        try {
            const res = await axiosInstance.post("/change-password", data)
            toast.success("Password Changed")
        } catch (error) {
            console.log("Error in changing password.");
            toast.error("Unable to change password.")
        }
    },

    changeUserDetail: async (userData) => {

    },

    logout: async (userData) => {
        try {
            await axiosInstance.delete("/auth/logout")
            set({ authUser: undefined })
            toast.success("Logout Successful")
        } catch (error) {
            console.log("Error logging out", error);
            toast.error("Error logging out");
        }
    },


    getProfile: async (userData) => {

    }

}))