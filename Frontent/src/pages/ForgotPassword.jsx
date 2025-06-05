import { zodResolver } from "@hookform/resolvers/zod"
import { Code, Loader2, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthStore } from "../store/useAuthStore"


const forgotSchema = z.object({
    email: z.string().email("Enter a valid email.")
})

const ForgotPassword = () => {

    const { forgotPassword, isPasswordForgoting } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotSchema)
    })

    const onSubmit = async (data) => {
        try {
            await forgotPassword(data)
        } catch (error) {
            console.log("Forgot Password failed", error);
        }
    }

    return (
        <div className="h-screen flex justify-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Code className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold mt-2">Forgot Password</h1>
                        <p className="text-base-content/60">Reset Your Password Here</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Email</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type="email"
                                {...register("email")}
                                className={`input input-bordered w-full pl-10 `
                                }
                                placeholder="Enter Your email here"
                            />
                        </div>
                    </div>



                    {/* Submit Button */}
                    <div className='space-y-1.5'>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isPasswordForgoting}
                        >
                            {isPasswordForgoting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Reset my Password"
                            )}
                        </button >
                    </div>
                </form>

                {/* Footer */}


            </div>
        </div>
    )
}

export default ForgotPassword