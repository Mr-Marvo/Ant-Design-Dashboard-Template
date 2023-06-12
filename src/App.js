import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login, Map, NotFound } from "./pages";
import { Main } from "./layouts";

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {token !== null ? (
          <Route path="/" element={<Main />}>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/map" element={<Map />} />
          </Route>
        ) : (
          <>
            <Route exact path="*" element={<NotFound />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/500" element={<SomethingWentWrong />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
