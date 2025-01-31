import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  setActiveQuickMenu,
  setIsQuickMenuClick,
} from "../../store/quickMenuSlice";
import { GiCaptainHatProfile } from "react-icons/gi";
import { GiShipBow } from "react-icons/gi";
import { IoTicket } from "react-icons/io5";

function Gnb() {
  const dispatch = useDispatch();
  const { activeQuickMenu } = useSelector((state) => state.quickMenu);

  const handleQuickMenuClick = (index) => {
    dispatch(setActiveQuickMenu(index));
    dispatch(setIsQuickMenuClick(true));

    setTimeout(() => {
      dispatch(setIsQuickMenuClick(false));
    }, 1000);
  };

  return (
    <nav>
      <h1>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <img src="/logo.png" alt="로고" />
        </NavLink>
      </h1>
      <ul className="gnb">
        <li>
          <button
            className={activeQuickMenu === 0 ? "active" : ""}
            onClick={() => handleQuickMenuClick(0)}
          >
            <GiCaptainHatProfile />
            선장 <span>profile</span>
          </button>
        </li>
        <li>
          <button
            className={activeQuickMenu === 1 ? "active" : ""}
            onClick={() => handleQuickMenuClick(1)}
          >
            <GiShipBow />
            항해 <span>project</span>
          </button>
        </li>
        <li>
          <button
            className={activeQuickMenu === 2 ? "active" : ""}
            onClick={() => handleQuickMenuClick(2)}
          >
            <IoTicket />
            탑승권 <span>boarding pass</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Gnb;
