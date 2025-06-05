import { zodResolver } from '@hookform/resolvers/zod'
import { Code, Eye, EyeOff, Loader2, Lock } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import { useAuthStore } from '../store/useAuthStore'


const resetSchema = z.object({
    password: z.string().min(8, "Password must be atleast of 8 characters."),
    confirmPassword: z.string().min(8, "Password must be atleast of 8 characters.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ['confirmPassword']
})

const ResetPassword = () => {
    const { isPasswordForgoting, resetForgotPassword } = useAuthStore()

    const [showPassword, setShowPassword] = useState()
    const [showConfirmPassword, setShowConfirmPassword] = useState()

    const { token } = useParams()

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetSchema)
    })

    const onSubmit = async (data) => {
        await resetForgotPassword(data, token)
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


                    {/* Password */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Password</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className={`input input-bordered w-full pl-10 ${errors.password ? "input-error" : ""
                                    }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>


                    {/* Confirm Password */}

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Confirm Your Password</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-base-content/40" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className={`input input-bordered w-full pl-10 ${errors.confirmPassword ? "input-error" : ""
                                    }`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
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
                                "Reset Password"
                            )}
                        </button >
                    </div>
                </form>

                {/* Footer */}


            </div>
        </div>
    )
}

export default ResetPassword