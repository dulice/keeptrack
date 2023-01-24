import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Project } from './Project';
import { projectAPI } from './projectAPI';
import ProjectDetail from './ProjectDetail';

const ProjectPage = () => {  
  const param = useParams();
  const id = Number(param.id);

    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const loadProjects = async () => {
          setIsLoading(true);
          try {
            const data = await projectAPI.find(id);
            setProject(data);
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
      },[id]);
  return (
    <div>
        <h1>Project Detail</h1>
        {isLoading && (
            <div className="center-page">
                <span className="primary spinner"></span>
                <p>Loading...</p>
            </div>
        )}
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
        {project && <ProjectDetail project={project} />}
    </div>
  )
}

export default ProjectPage