import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "../../../firebase";
import {
  getDownloadURL,
  ref as strRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  ref as dbRef,
  off,
  onChildAdded,
  push,
  serverTimestamp,
  update,
} from "firebase/database";
import { useSelector } from "react-redux";
import { SlClose } from "react-icons/sl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Project() {
  const { currentUser } = useSelector((state) => state.user);
  const [isProjectModalCreate, setIsProjectModalCreate] = useState(false);
  const [isProjectModalRead, setIsProjectModalRead] = useState(false);
  const [projectNum, setProjectNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef();
  const [imageFileName, setImageFileName] = useState(
    "이미지파일 (png, jpg, gif)"
  );
  const projectsRef = dbRef(db, "projects");
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 모달팝업
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsProjectModalCreate(false);
        setIsProjectModalRead(false);
        reset();
        setImageFileName("이미지파일 (png, jpg, gif)");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenProjectModalCreate = () => {
    setIsProjectModalCreate(true);
  };

  const handleCloseProjectModalCreate = () => {
    setIsProjectModalCreate(false);
    reset();
    setImageFileName("이미지파일 (png, jpg, gif)");
  };

  // 프로젝트 Create
  const handleImageFileNameChange = (e) => {
    setImageFileName(e.target.files[0].name);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const file = data.projectImg[0];

    if (file) {
      try {
        // Firebase Storage에 업로드
        const storageRef = strRef(storage, `projects/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // 업로드 완료 후 다운로드 URL을 얻기
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload failed:", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at:", downloadURL);

            const projectKey = push(projectsRef).key;

            await update(dbRef(db, `projects/${projectKey}`), {
              id: projectKey,
              timestamp: serverTimestamp(),
              createUser: {
                id: currentUser.uid,
                name: currentUser.displayName,
              },
              projectTitle: data.projectTitle,
              projectImgURL: downloadURL,
            });

            console.log("Project saved to Realtime Database!");
          }
        );

        reset();
        setLoading(false);
        setImageFileName("이미지파일 (png, jpg, gif)");
        handleCloseProjectModalCreate();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  // 프로젝트 Read
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

    onChildAdded(projectsRef, (DateSnapshot) => {
      projectsArray.push(DateSnapshot.val());
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
            <a href="#" onClick={() => handleOpenProjectModalRead(project, i)}>
              <div className="img-wrap">
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${project.projectImgURL})`,
                  }}
                ></div>
              </div>
              <div className="text">{project.projectTitle}</div>
            </a>
          </li>
        ))
    ) : (
      <div style={{ fontSize: "13px", color: "#fff" }}>
        등록된 프로젝트가 없습니다.
      </div>
    );

  const handleOpenProjectModalRead = (project, i) => {
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

  // 프로젝트 Update

  // 프로젝트 Delete

  return (
    <div className="project">
      <div>
        <h2>Project</h2>
        <button
          type="button"
          className="btn--primary"
          onClick={handleOpenProjectModalCreate}
        >
          등록
        </button>
        {isProjectModalCreate && (
          <div className="modal">
            <div className="popup" ref={popupRef}>
              <div className="title">
                <strong>프로젝트 등록</strong>
                <button type="button" onClick={handleCloseProjectModalCreate}>
                  <SlClose />
                  <span>닫기</span>
                </button>
              </div>
              <div className="content">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <label className="file-btn">
                      <b>이미지</b>
                      <i>파일선택</i>
                      <span>{imageFileName}</span>
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/gif"
                        name="projectImg"
                        {...register("projectImg", { required: true })}
                        onChange={handleImageFileNameChange}
                      />
                    </label>
                    {errors.projectImg &&
                      errors.projectImg.type === "required" && (
                        <p className="validation-text">필수입력</p>
                      )}
                  </div>
                  <div className="row">
                    <label>
                      <b>프로젝트명</b>
                      <input
                        type="text"
                        placeholder="프로젝트명"
                        name="projectTitle"
                        {...register("projectTitle", { required: true })}
                      />
                    </label>
                    {errors.projectTitle &&
                      errors.projectTitle.type === "required" && (
                        <p className="validation-text">필수입력</p>
                      )}
                  </div>
                  <div className="btn-wrap">
                    <button
                      type="submit"
                      className="btn--primary"
                      disabled={loading}
                    >
                      생성
                    </button>
                    <button
                      type="button"
                      className="btn--outline"
                      onClick={handleCloseProjectModalCreate}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {isProjectModalRead && (
          <div className="modal modal--project">
            <div className="popup" ref={popupRef}>
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
      </div>
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
    </div>
  );
}

export default Project;
