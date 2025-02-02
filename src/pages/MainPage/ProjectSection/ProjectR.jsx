import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { ref as dbRef, off, onValue } from "firebase/database";
import { SlClose } from "react-icons/sl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectU from "./ProjectU";
import ProjectD from "./ProjectD";

function ProjectR() {
  const [projectNum, setProjectNum] = useState(0);
  const projectsRef = dbRef(db, "projects");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [isProjectModalRead, setIsProjectModalRead] = useState(false);

  useEffect(() => {
    ProjectsListener();
    setCurrentPage(0);

    return () => {
      off(projectsRef);
    };
  }, []);

  const PER_PAGE = 6;
  const pageCount = Math.ceil(projects.length / PER_PAGE);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const ProjectsListener = () => {
    let projectsArray = [];

    onValue(projectsRef, (snapshot) => {
      projectsArray = [];
      snapshot.forEach((childSnapshot) => {
        projectsArray.push(childSnapshot.val());
      });

      const newProjectsArray = [...projectsArray];
      setProjects(newProjectsArray.reverse());
      setProjectsLoading(false);
    });
  };

  const renderProjectsSkeleton = (loading) => {
    return (
      loading && (
        <ul className="projectsSkeleton">
          {[...Array(6)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      )
    );
  };

  const renderProjects = (projects) =>
    projects.length ? (
      projects
        .slice(currentPage * PER_PAGE, currentPage * PER_PAGE + PER_PAGE)
        .map((project, i) => (
          <li key={i}>
            <div>
              <a
                href="/"
                onClick={(e) => handleOpenProjectModalRead(e, project, i)}
              >
                <div className="img-wrap">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${project.projectImgURL})`,
                    }}
                  ></div>
                </div>
              </a>
              <div className="project-btns">
                <ProjectU project={project} />
                <ProjectD project={project} />
              </div>
            </div>
            <div className="text">{project.projectTitle}</div>
          </li>
        ))
    ) : (
      <div style={{ fontSize: "13px", color: "#fff" }}>
        등록된 프로젝트가 없습니다.
      </div>
    );

  const handleOpenProjectModalRead = (e, project, i) => {
    e.preventDefault();
    setProjectNum(i);
    setProject(project);
    setIsProjectModalRead(true);
  };

  const handleCloseProjectModalRead = () => {
    setIsProjectModalRead(false);
  };

  const handleProjectModalPrev = () => {
    if (projectNum > 0) {
      setProject(projects[projectNum - 1]);
      setProjectNum(projectNum - 1);
    } else {
      return;
    }
  };

  const handleProjectModalNext = () => {
    if (projectNum < projects.length - 1) {
      setProject(projects[projectNum + 1]);
      setProjectNum(projectNum + 1);
    } else {
      return;
    }
  };

  return (
    <>
      {renderProjectsSkeleton(projectsLoading)}
      <ul className="projects">{renderProjects(projects)}</ul>
      <ReactPaginate
        previousLabel={<FiChevronLeft />}
        nextLabel={<FiChevronRight />}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageLinkClassName={"pagination__link"}
        activeLinkClassName={"pagination__link__active"}
      />
      {isProjectModalRead && (
        <div className="modal modal--project">
          <div className="popup">
            <div className="title">
              <strong>{project.projectTitle}</strong>
              <button type="button" onClick={handleCloseProjectModalRead}>
                <SlClose />
                <span>닫기</span>
              </button>
            </div>
            <div className="content">
              <img src={`${project.projectImgURL}`} alt="프로젝트이미지" />
            </div>
            <button
              type="button"
              className="prev-btn"
              onClick={handleProjectModalPrev}
            >
              <i>
                <FaArrowLeft />
              </i>
              <span>이전</span>
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleProjectModalNext}
            >
              <i>
                <FaArrowRight />
              </i>
              <span>다음</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectR;
