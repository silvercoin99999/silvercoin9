import React from "react";
import { MdDelete } from "react-icons/md";
import { db, storage } from "../../../firebase";
import { ref as dbRef, remove } from "firebase/database";
import { deleteObject, ref as strRef } from "firebase/storage";
import { useSelector } from "react-redux";

function ProjectD({ project }) {
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteProject = () => {
    if (currentUser.uid !== project.createUser.id) {
      alert("본인만 삭제 가능합니다.");
      return;
    }

    if (window.confirm("정말 삭제하시겠습니까?")) {
      remove(dbRef(db, `projects/${project.id}`));
      deleteObject(strRef(storage, `projects/${project.fileName}`));
    }
  };

  return (
    <button
      type="button"
      className="project-btn--delete"
      onClick={handleDeleteProject}
    >
      <MdDelete />
      <span>삭제</span>
    </button>
  );
}

export default ProjectD;
