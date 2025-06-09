import { toast } from "react-hot-toast"
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"



export const useProblemStore = create((set) => ({
    problems: [],
    problem: null,
    solvedProblem: [],
    isProblemsLoading: false,
    isProblemLoading: false,


    getAllProblems: async () => {
        try {
            set({ isProblemsLoading: true })
            const { data } = await axiosInstance.get("/problem/get-all-problem")
            set({ problems: data.data })
        } catch (error) {
            console.log("Error getting all Problem", error);
            toast.error("Error getting Problems")
        } finally {
            set({ isProblemsLoading: false })
        }
    },

    getProblemById: async (id) => {
        try {
            set({ isProblemLoading: true })
            const res = await axiosInstance.post(`/problem/get-problem/${id}`)
            set({ problem: res.data })
            toast.success(res.message)
        } catch (error) {
            console.log("Error getting Problem", error);
            toast.error("Error in getting Problem")
        } finally {
            set({ isProblemLoading: false })
        }
    },

    getSolvedProblemByUser: async () => {
        try {
            const {data} = await axiosInstance.get("/problem/get-solved-problem")            
            set({ solvedProblem: data.data })
        } catch (error) {
            console.log("Error in fetch solvedProblem", error);
            toast.error("Error in fetch solvedProblem")
        }
    },

    updateProblem: async (id, data) => {
        try {
            const res = await axiosInstance.put(`/problem/update-problem/${id}`, data)

        } catch (error) {

        }
    },
}))

