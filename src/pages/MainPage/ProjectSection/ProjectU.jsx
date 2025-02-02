import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { SlClose } from "react-icons/sl";
import {
  deleteObject,
  getDownloadURL,
  ref as strRef,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../../../firebase";
import { ref as dbRef, update } from "firebase/database";
import { useSelector } from "react-redux";

function ProjectU({ project }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isProjectModalUpdate, setIsProjectModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFileName, setImageFileName] = useState(
    "이미지파일 (png, jpg, gif)"
  );
  const [projectTitle, setProjectTitle] = useState(project.projectTitle);
  const popupRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsProjectModalUpdate(false);
        reset();
        setImageFileName("이미지파일 (png, jpg, gif)");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageFileNameChange = (e) => {
    setImageFileName(e.target.files[0].name);
  };

  const handleProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleOpenProjectModalUpdate = () => {
    setIsProjectModalUpdate(true);
  };

  const handleCloseProjectModalUpdate = () => {
    setIsProjectModalUpdate(false);
    reset();
  };

  const onSubmit = async (data) => {
    if (currentUser.uid !== project.createUser.id) {
      alert("본인만 수정 가능합니다.");
      return;
    }

    setLoading(true);
    const file = data.projectImg[0];

    if (file !== undefined) {
      // 스토리지 파일 삭제
      await deleteObject(strRef(storage, `projects/${project.fileName}`));
      console.log("파일 삭제 완료");

      // 스토리지에 업로드
      const storageRef = strRef(storage, `projects/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // DB에 정보저장
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`업로드 진행률: ${progress}%`);
        },
        (error) => {
          console.error("업로드 실패:", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("파일 다운로드 URL:", downloadURL);

          await update(dbRef(db, `projects/${project.id}`), {
            projectTitle: data.projectTitle,
            projectImgURL: downloadURL,
            fileName: file.name,
          });

          console.log("프로젝트 정보 Realtime Database에 저장 완료!");
        }
      );
    } else {
      // 이미지 파일 없음
      try {
        update(dbRef(db, `projects/${project.id}`), {
          projectTitle: data.projectTitle,
        });
      } catch (error) {
        console.log(error);
      }
    }

    reset();
    setImageFileName("이미지파일 (png, jpg, gif)");
    handleCloseProjectModalUpdate();
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className="project-btn--update"
        onClick={handleOpenProjectModalUpdate}
      >
        <MdEdit />
        <span>수정</span>
      </button>
      {isProjectModalUpdate && (
        <div className="modal">
          <div className="popup" ref={popupRef}>
            <div className="title">
              <strong>프로젝트 수정</strong>
              <button type="button" onClick={handleCloseProjectModalUpdate}>
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
                      {...register("projectImg")}
                      onChange={handleImageFileNameChange}
                    />
                  </label>
                </div>
                <div className="row">
                  <label>
                    <b>프로젝트명</b>
                    <input
                      type="text"
                      placeholder={"프로젝트명"}
                      name="projectTitle"
                      value={projectTitle}
                      {...register("projectTitle", { required: true })}
                      onChange={handleProjectTitleChange}
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
                    수정
                  </button>
                  <button
                    type="button"
                    className="btn--outline"
                    onClick={handleCloseProjectModalUpdate}
                  >
                    취소
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectU;
