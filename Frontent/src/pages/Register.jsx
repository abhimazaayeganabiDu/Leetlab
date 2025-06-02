import { zodResolver } from "@hookform/resolvers/zod";
import {
	Camera,
	Code,
	Eye,
	EyeOff,
	Loader2,
	Lock,
	Mail,
} from "lucide-react";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import { z } from "zod";
import AuthImagePattern from '../components/AuthImagePattern';
import { useAuthStore } from "../store/useAuthStore";

const SignUpSchema = z.object({
	email: z.string().email("Enter a valid email"),
	username: z.string().min(4, "Username must be atleast of 4 characters."),
	password: z.string().min(8, "Password must be atleast of 8 characters."),
	name: z.string().min(3, "Name must be atleast 3 character"),
	avatar: z.any().refine((file) => file?.length === 1, {
		message: "Image is required",
	})
		.refine((file) => file?.[0]?.type?.startsWith("image/"), {
			message: "Must be an image",
		})
})

const Register = () => {

	const [showPassword, setShowPassword] = useState(false);
	const { signup, isSigninUp } = useAuthStore()



	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(SignUpSchema)
	})

	const onSubmit = async (data) => {
		try {
			console.log("data", data);

			await signup(data)
		} catch (error) {
			console.error("SignUp failed:", error);
		}
	}


	return (
		<div className='h-screen grid lg:grid-cols-2'>
			<div className="flex flex-col justify-center items-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					{/* Logo */}
					<div className="text-center mb-8">
						<div className="flex flex-col items-center gap-2 group">
							<div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
								<Code className="w-6 h-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold mt-2">Welcome </h1>
							<p className="text-base-content/60">Sign Up to your account</p>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

						{/* {avatar} */}
						<div className="relative w-32 h-32">
							<div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-white text-3xl">
								<span>👤</span>
							</div>
							<label
								htmlFor="avatar"
								className="absolute bottom-1 right-1 bg-gray-600 p-2 rounded-full cursor-pointer hover:bg-gray-700"
							>
								<input
									type="file"
									accept="image/*"
									id="avatar"
									{...register("avatar")}
									className="hidden"
								/>
								<Camera />
							</label>
						</div>
						{errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}

						{/* name */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Name</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Code className="h-5 w-5 text-base-content/40" />
								</div>
								<input
									type="text"
									{...register("name")}
									className={`input input-bordered w-full pl-10 ${errors.name ? "input-error" : ""
										}`}
									placeholder="Enter your Full Name"
								/>
							</div>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
							)}
						</div>

						{/* Username */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Username</span>
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-base-content/40" />
								</div>
								<input
									type="username"
									{...register("username")}
									className={`input input-bordered w-full pl-10 ${errors.username ? "input-error" : ""
										}`}
									placeholder="example_234"
								/>
							</div>
							{errors.username && (
								<p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
							)}
						</div>


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
									className={`input input-bordered w-full pl-10 ${errors.email ? "input-error" : ""
										}`}
									placeholder="you@example.com"
								/>
							</div>
							{errors.email && (
								<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
							)}
						</div>



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

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-primary w-full"
							disabled={isSigninUp}
						>
							{isSigninUp ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									Loading...
								</>
							) : (
								"Sign in"
							)}
						</button>
					</form>

					{/* Footer */}
					<div className="text-center">
						<p className="text-base-content/60">
							Already have an account?{" "}
							<Link to="/login" className="link link-primary">
								Sign in
							</Link>
						</p>
					</div>
				</div>
			</div >

			{/* Right Side - Image/Pattern */}
			< AuthImagePattern
				title={"Welcome to our platform!"}
				subtitle={
					"Sign up to access our platform and start using our services."
				}
			/>
		</div >
	)
}

export default Register