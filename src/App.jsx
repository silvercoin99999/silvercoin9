import React, { useEffect } from "react";
import "./App.scss";
import app from "./firebase";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./store/userSlice";
import Background from "./pages/CommonGrid/background";
import Header from "./pages/CommonGrid/Header";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import Footer from "./pages/CommonGrid/footer";

function App() {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(clearUser(user));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Background />
      <div className="wrap">
        <Header />
        <div className="layout">
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
