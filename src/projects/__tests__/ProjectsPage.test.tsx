import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import ProjectsPage from "../ProjectsPage"
import { setupServer } from "msw/node"
import { rest } from 'msw';
import { url as projectsUrl} from "../projectAPI";
import { MOCK_PROJECTS } from "../MockProject";

const server = setupServer(
    rest.get(projectsUrl, (req, res, cb) => {
        return res(cb.json(MOCK_PROJECTS));
    })
)

describe('<ProjectsPage />', () => {
    function setup() {
        render(
            <MemoryRouter>
                <ProjectsPage />
            </MemoryRouter>
        )
    }

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should render without crashing", () => {
        setup();
        expect(screen).toBeDefined();
    })

    it("should display loading", () => {
        setup();
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    })

    it("should display projects", async () => {
        setup();
        expect( await screen.findAllByRole('img')).toHaveLength(MOCK_PROJECTS.length);
    })

    it("should display more... button", async () => {
        setup();
        expect(await screen.findByRole('button', { name: /more/i })).toBeInTheDocument();
    })

    it("should display more button with query get", async () => {
        setup();
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
        expect(screen.getByRole('button', {name: /more/i})).toBeInTheDocument();
    })

    it("should display custom error on server error", async () => {
        server.use(
            rest.get(projectsUrl, (req, res, cb) => {
                return res(cb.status(500, 'Server Error'))
            })
        );
        setup();
        expect( await screen.findByText(/There was an error retrieving the project/i )).toBeInTheDocument();
    })
})