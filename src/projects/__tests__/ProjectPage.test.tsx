import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { MemoryRouter } from "react-router-dom";
import { MOCK_PROJECTS } from "../MockProject";
import { url } from "../projectAPI";
import ProjectPage from "../ProjectPage";

const server = setupServer(
  rest.get(`${url}/1`, (req, res, ctx) => {
    return res(ctx.json(MOCK_PROJECTS));
  })
);

describe("<ProjectPage />", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <ProjectPage />
      </MemoryRouter>
    );
  };

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should display heading", () => {
    setup();
    expect(screen.getByRole("heading")).toHaveTextContent(/project detail/i);
  });

  it("should display loading", () => {
    setup();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
