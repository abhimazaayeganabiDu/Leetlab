import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Register";
import HomePage from "./pages/Home";

const App = () => {
	let isAuthenticated = null;

	return (
		<div className="flex flex-col items-center justify-start">
			<Routes>
				<Route
					path="/"
					element={
						isAuthenticated ? (
							<HomePage />
						) : (
							<Navigate to={"/login"} />
						)
					}
				/>

				<Route
					path="/register"
					element={
						!isAuthenticated ? (
							<SignUpPage />
						) : (
							<Navigate to={"/"} />
						)
					}
				></Route>
				<Route
					path="/login"
					element={
						!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />
					}
				>
					{" "}
				</Route>
			</Routes>
		</div>
	);
};

export default App;
