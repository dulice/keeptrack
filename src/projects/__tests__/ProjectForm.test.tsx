import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Project } from "../Project";
import ProjectForm from "../ProjectForm";

describe("<ProjectForm />", () => {
  let project: Project;
  let updatedProject: Project;
  let handleCancel: jest.Mock;
  let handleSave: jest.Mock;

  const setup = () => {
    render(
      <MemoryRouter>
        <ProjectForm
          project={project}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      </MemoryRouter>
    );
  };

  // !error occur
  let nameTextBox: any = screen.getByRole("textbox", {
    name: /project name/i,
  });
  let descriptionTextBox: any = screen.getByRole("textbox", {
    name: /project description/i,
  });
  let budgetTextBox: any = screen.getByRole("spinbutton", {
    name: /project budget/i,
  });

  beforeEach(() => {
    project = new Project({
      id: 1,
      name: "Mission Impossible",
      description: "This is really difficult",
      budget: 100,
    });
    updatedProject = new Project({
      name: "Ghost Protocol",
      description:
        "Blamed for a terrorist attack on the Kremlin, Ethan Hunt (Tom Cruise) and the entire IMF agency...",
    });
    handleCancel = jest.fn();
  });

  test("should load project into form", () => {
    setup();
    expect(
      screen.getByRole("form", {
        name: /edit a project/i,
      })
    ).toHaveFormValues({
      name: project.name,
      description: project.description,
      budget: project.budget,
      isActive: project.isActive,
    });
  });

  it("should accept input", async () => {
    const user = userEvent.setup();

    await user.clear(nameTextBox);
    await user.type(nameTextBox, updatedProject.name);
    expect(nameTextBox).toHaveValue(updatedProject.name);

    await user.clear(descriptionTextBox);
    await user.type(descriptionTextBox, updatedProject.description);
    expect(descriptionTextBox).toHaveValue(updatedProject.description);

    await user.clear(budgetTextBox);
    await user.type(budgetTextBox, updatedProject.budget.toString());
    expect(budgetTextBox).toHaveValue(updatedProject.budget);
  });

  it("name should display required validation", async () => {
    const user = userEvent.setup();
    await user.clear(nameTextBox);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("name should display min-length validation", async () => {
    const user = userEvent.setup();
    await user.clear(nameTextBox);
    await user.type(nameTextBox, "ab");
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.type(nameTextBox, "c");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("budget should display not 0 validation", async () => {
    const user = userEvent.setup();
    await user.clear(budgetTextBox);
    await user.type(budgetTextBox, "0");
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.type(budgetTextBox, "1");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
