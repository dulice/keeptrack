import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}
const ProjectList = ({ projects, onSave }: ProjectListProps) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const handleCancel = () => {
    setProjectBeingEdited({});
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(projects, null, ' ')}</pre> */}
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="cols-sm">
            {project === projectBeingEdited ? (
              <ProjectForm
                project={project}
                onCancel={handleCancel}
                onSave={onSave}
              />
            ) : (
              <ProjectCard project={project} onEdit={handleEdit} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
