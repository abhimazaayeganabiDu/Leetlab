import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const App = () => {
    return (
    <div className="flex flex-col items-center justify-start">
      <Routes>
        <Route path="/login" element={<LoginPage/>}> </Route>
      </Routes>
    </div>
    )
};

export default App;
