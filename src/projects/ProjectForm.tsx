import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onCancel: () => void;
  onSave: (project: Project) => void;
}

const ProjectForm = ({
  onCancel,
  onSave,
  project: initialProject,
}: ProjectFormProps) => {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const isValid = () => {
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
  };

  const handleValidation = (project: Project) => {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0";
    }
    return errors;
  };

  const handleChange = (e: any) => {
    const { type, name, value, checked } = e.target;
    let updateValue = type === "checkbox" ? checked : value;
    if (type === "number") {
      updateValue = Number(updateValue);
    }
    const change = { [name]: updateValue };
    console.log(change);
    let updateProject: Project;
    setProject((p) => {
      updateProject = new Project({ ...p, ...change });
      return updateProject;
    });
    setErrors(() => handleValidation(updateProject));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  return (
    <div>
      <form
        className="input-group vertical"
        aria-label="Edit a project"
        name="project"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          name="name"
          aria-labelledby="project name"
          id="name"
          placeholder="Enter Name"
          value={project.name}
          onChange={handleChange}
        />
        {errors.name.length > 0 && (
          <div className="card error" role="alert">
            <p>{errors.name}</p>
          </div>
        )}
        <label htmlFor="description">Project Description</label>
        <input
          type="text"
          name="description"
          id="description"
          aria-label="project description"
          placeholder="Enter description"
          value={project.description}
          onChange={handleChange}
        />
        {errors.description.length > 0 && (
          <div className="card error" role="alert">
            <p>{errors.description}</p>
          </div>
        )}
        <label htmlFor="budget">Project Budget</label>
        <input
          type="number"
          aria-label="project budget"
          name="budget"
          id="budget"
          placeholder="Enter Budget"
          value={project.budget}
          onChange={handleChange}
        />
        {errors.budget.length > 0 && (
          <div className="card error">
            <p>{errors.budget}</p>
          </div>
        )}
        <label htmlFor="isActive">isActive?</label>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={project.isActive}
          onChange={handleChange}
        />
        <div className="input-group">
          <button
            type="submit"
            className="primary bordered medium"
            disabled={!isValid()}
          >
            Save
          </button>
          <span></span>
          <button type="button" className="bordered medium" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
