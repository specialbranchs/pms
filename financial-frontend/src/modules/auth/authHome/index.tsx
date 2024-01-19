import React from "react";

import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import Login from "../login";
import Register from "../register";

const AuthHomeScreen = () => {

    return (
        <HashRouter>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
       </HashRouter>
    )
}
export default AuthHomeScreen;