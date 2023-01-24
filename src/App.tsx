import ProjectsPage from './projects/ProjectsPage';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import HomePage from './home/HomePage';
import Nav from './components/Nav';
import ProjectPage from './projects/ProjectPage';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/projects' element={ <ProjectsPage /> } />
          <Route path='/projects/:id' element={ <ProjectPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
