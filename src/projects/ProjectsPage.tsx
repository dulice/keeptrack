import React, { useEffect, useState } from 'react'
import { MOCK_PROJECTS } from './MockProject'
import { Project } from './Project'
import { projectAPI } from './projectAPI'
import ProjectList from './ProjectList'

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if(currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((project) => [...project, ...data]);
        }
        setError('');
      } catch (error) {
        if(error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  },[currentPage]);

  const handleSave = (project: Project) => {
    projectAPI
    .put(project)
    .then((updateProject) => {
      let updateProjects = projects.map((p: Project) => {
        return p.id === project.id ? new Project(updateProject): p;
      });
      setProjects(updateProjects);
    })
    .catch((error: TypeError) => {
      if(error instanceof Error) {
        setError(error.message);
      }
    });
  }

  return (
    <div>
        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse"></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}
        <ProjectList projects={projects} onSave={handleSave}/>
        {!isLoading && !error && (
          <div className="row">
            <div className="col-sm-12">
              <div className="button-group fluid">
                <button className="button-default" onClick={() => setCurrentPage(currentPage+1)}>More...</button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default ProjectsPage