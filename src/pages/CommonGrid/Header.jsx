import React, { useEffect, useState } from "react";
import Bgm from "./Bgm";
import Gnb from "./Gnb";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase";
import { useSelector } from "react-redux";

function Header() {
  const auth = getAuth(app);
  const { currentUser } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsMenuOpen(false);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 889);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const toggleMenu = () => {
    if (isMobile) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(true);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <div className="mo-menu-bg">
          <button
            type="button"
            onClick={toggleMenu}
            className={isMenuOpen ? "mo-menu open" : "mo-menu"}
          >
            <div className="hambergerIcon"></div>
          </button>
        </div>
      )}
      <header className={isMenuOpen || !isMobile ? "openHam" : ""}>
        <div>
          <Gnb />
          <div className="gnb-util">
            <Bgm />
            <div className="auth">
              {currentUser.uid ? (
                <div>
                  <p>{currentUser.displayName}</p>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  로그인
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
