import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

function Projects({ portfolioOwnerId, isEditable }) {
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("projectlist", portfolioOwnerId).then((res) =>
      setProjects(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title
          style={{
            display: "inline-block",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        >
          프로젝트
        </Card.Title>
        {isEditable && (
          <button
            className="btn-add"
            style={{ display: "inline-block" }}
            onClick={() => setIsAdding(true)}
          >
            +
          </button>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Projects;
