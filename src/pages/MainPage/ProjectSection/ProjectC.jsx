import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../../../firebase";
import { SlClose } from "react-icons/sl";
import {
  getDownloadURL,
  ref as strRef,
  uploadBytesResumable,
} from "firebase/storage";
import { ref as dbRef, push, serverTimestamp, update } from "firebase/database";
import { useForm } from "react-hook-form";

function ProjectC() {
  const [isProjectModalCreate, setIsProjectModalCreate] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const popupRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageFileName, setImageFileName] = useState(
    "이미지파일 (png, jpg, gif)"
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsProjectModalCreate(false);
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

            const projectsRef = dbRef(db, "projects");
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
              fileName: file.name,
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

  return (
    <div>
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
    </div>
  );
}

export default ProjectC;
