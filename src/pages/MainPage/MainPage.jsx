import React, { useEffect, useRef } from "react";
import Profile from "./Section/Profile";
import Project from "./Section/Project";
import BoardingPass from "./Section/boardingPass";
import { useDispatch, useSelector } from "react-redux";
import { setActiveQuickMenu } from "../../store/quickMenuSlice";

function MainPage() {
  const dispatch = useDispatch();
  const sectionsRef = useRef([]);
  const { activeQuickMenu } = useSelector((state) => state.quickMenu);
  const { isQuickMenuClick } = useSelector((state) => state.quickMenu);

  useEffect(() => {
    if (isQuickMenuClick) {
      if (activeQuickMenu > 0) {
        sectionsRef.current[activeQuickMenu].scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [isQuickMenuClick]);

  useEffect(() => {
    const handleScroll = () => {
      if (isQuickMenuClick) {
        return;
      }

      const sectionheight0 = sectionsRef.current[0].clientHeight;
      const sectionheight1 = sectionsRef.current[1].clientHeight;
      // const sectionheight2 = sectionsRef.current[2].clientHeight;

      if (window.scrollY < sectionheight0 - sectionheight0 * 0.3) {
        dispatch(setActiveQuickMenu(0));
      } else if (
        window.scrollY > sectionheight0 - sectionheight0 * 0.3 &&
        window.scrollY < sectionheight1 + sectionheight1 * 0.3
      ) {
        dispatch(setActiveQuickMenu(1));
      } else if (window.scrollY > sectionheight1 + sectionheight1 * 0.3) {
        dispatch(setActiveQuickMenu(2));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isQuickMenuClick]);

  return (
    <>
      <section ref={(el) => (sectionsRef.current[0] = el)}>
        <Profile />
      </section>
      <section ref={(el) => (sectionsRef.current[1] = el)}>
        <Project />
      </section>
      <section ref={(el) => (sectionsRef.current[2] = el)}>
        <BoardingPass />
      </section>
    </>
  );
}

export default MainPage;
