import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { MOCK_PROJECTS } from "../MockProject"
import ProjectList from "../ProjectList"

describe('<ProjectList />', () => {
    let handleSave: jest.Mock;
    const setup = () => {
        render(
            <MemoryRouter>
                <ProjectList projects={MOCK_PROJECTS} onSave={handleSave}/>
            </MemoryRouter>
        )
    };

    beforeEach(() => {});

    it("should render without crashing", () => {
        setup();
        expect(screen).toBeDefined();
    })

    it("should display list", () => {
        setup();
        expect(screen.getAllByRole('heading')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('link')).toHaveLength(MOCK_PROJECTS.length);
        expect(screen.getAllByRole('button')).toHaveLength(MOCK_PROJECTS.length);
    });

    it("should display a form when the edit is clicked", async () => {
        setup();
        const user = userEvent.setup();
        await user.click(
            screen.getByRole('button', { name: /edit Johnson - Kutch/i})
        );
        expect(screen.getByRole('form', { name: /edit a project/i })).toBeInTheDocument();
    });

    it("should display image and remove form when cancel button is clicked", async () => {
        setup();
        const user = userEvent.setup();
        await user.click(
            screen.getByRole('button', { name: /edit Johnson - Kutch/i })
        )
        await user.click(
            screen.getByRole('button', { name: /cancel/i })
        )
        expect(screen.getByRole('img', { name: /Johnson - Kutch/i })).toBeInTheDocument();
        expect(screen.queryByRole('form', { name: /edit a project/i })).not.toBeInTheDocument();
    })
})