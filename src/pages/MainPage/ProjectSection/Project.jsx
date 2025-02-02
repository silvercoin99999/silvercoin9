import React from "react";
import ProjectC from "./ProjectC";
import ProjectR from "./ProjectR";

function Project() {
  return (
    <div className="project">
      <div>
        <h2>Project</h2>
        <ProjectC />
      </div>
      <ProjectR />
    </div>
  );
}

export default Project;
