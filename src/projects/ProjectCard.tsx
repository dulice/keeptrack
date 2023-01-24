import { Link } from 'react-router-dom'
import { Project } from './Project'

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
}

const formatDescription = (description: string): string => {
  return description.substring(0, 60) + '...';
}
const ProjectCard = ({project, onEdit}: ProjectCardProps) => {
  const handleEditClick = (project: Project) => {
    onEdit(project);
  }
  return (
    <div className="card">
        <img src={project.imageUrl} alt={project.name} />
        <section className="dark section">
          <Link to={`/projects/${project.id}`}>
            <h5 className="strong">{project.name}</h5>
            <p>{formatDescription(project.description)}</p>
            <p>Budget: {project.budget?.toLocaleString()}</p>
          </Link>
            <button className="bordered" aria-label={`edit ${project.name}`} onClick={() => handleEditClick(project)}>
              <span className="icon-edit"></span>
              Edit
            </button>
        </section>
    </div>
  )
}

export default ProjectCard