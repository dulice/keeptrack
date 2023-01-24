import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Project } from "../Project"
import ProjectCard from "../ProjectCard";
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe("<ProjectCard />", () => {
    let project: Project;
    let handleEdit: jest.Mock;
    beforeEach(() => {
        project = new Project({
            id: 1,
            name: "Mission Impossible",
            description: "This is really difficult",
            budget: 100,
        });
        handleEdit = jest.fn();
    });

    const setup = () => {
        render(
            <MemoryRouter>
                <ProjectCard project={project} onEdit={handleEdit} />
            </MemoryRouter>
        );
    }

    it("should initially render", () => {
        setup();
    });

    it("renders project properties", () => {
        setup();
        expect(screen.getByRole('heading')).toHaveTextContent(project.name);
        // screen.debug(document)
        screen.getByText(/this is really difficult\.\.\./i);
        screen.getByText(/budget: 100/i);
    });

    it("handler called when edit clicked", async () => {
        setup();
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: /edit/i}));
        expect(handleEdit).toBeCalledTimes(1);
        expect(handleEdit).toBeCalledWith(project);
    })

    test('snapshot', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <ProjectCard project={project} onEdit={handleEdit} />
            </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})