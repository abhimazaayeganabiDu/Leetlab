import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import AdminRoute from "./components/AdminRoute";
import Layout from "./layout/Layout";
import AddProblem from "./pages/AddProblem";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProblemPage from "./pages/ProblemPage";
import Register from "./pages/Register";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


const App = () => {

	const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

	useEffect(() => {
		checkAuth()
	}, [checkAuth])


	if (isCheckingAuth && !authUser) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);
	}

	return (
		<div>
			<Toaster />
			<Routes>

				<Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
				<Route path="/register" element={!authUser ? <Register /> : <Navigate to={"/"} />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />

				<Route path="/verify-email/:id" element={<VerifyEmail />} />

				<Route
					path="/"
					element={authUser ? <Layout /> : <Navigate to="/login" />}
				>
					<Route index element={<Home />} />
				</Route>

				<Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to={"/login"} />} />

				<Route element={<AdminRoute />}>
					<Route path="/add-problem" element={authUser ? <AddProblem /> : <Navigate to={"/"} />} />
				</Route>

				<Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"} />} />

			</Routes>
		</div>
	)
}

export default App