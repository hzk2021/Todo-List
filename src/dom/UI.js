import bindButtons, {newClickBind} from '../dom/binding.js';
import { projectsStorage } from '../data/storage.js';
import { renderSpecificProjectContent, renderHomeContent, createButtonBinding } from './content.js';
import Project from '../models/Project.js';

function createProjectList() {
    const projectDiv = document.querySelector(".projects");
    const projectsUL = document.createElement("ul");
    
    const projects = projectsStorage.getProjects();
    projects.filter(proj => proj != projects[0]).forEach(proj => {
        const projectLI = document.createElement("li");
        const projectName = document.createElement("span");
        projectName.textContent = proj.name;
        
        newClickBind(projectName, renderSpecificProjectContent.bind(this, proj.name));

        const deleteBtn = createButtonBinding("X", () => {
            proj.deleteAllTasks();
            projectsStorage.deleteProject(proj.name);
            refreshProjectsList();
            renderHomeContent();
        });

        projectLI.appendChild(projectName);
        projectLI.appendChild(deleteBtn);

        projectsUL.appendChild(projectLI);
    });

    projectDiv.append(projectsUL);

    const addProjectBtn = createButtonBinding("Add Project", () => {
        const newProjectName = prompt("New Project's Name?");

        if (newProjectName == null || newProjectName == "") return;

        const newProject = new Project(newProjectName)
        projectsStorage.addProject(newProject);
        
        renderSpecificProjectContent(newProject.name);
        refreshProjectsList();
    });

    projectDiv.appendChild(addProjectBtn);
}

function deleteProjectsList() {
    const projectsUL = document.querySelector(".projects ul");
    projectsUL.remove();
    
    const projectDiv = document.querySelector(".projects");
    const addProjectBtn = document.querySelector(".projects > button");

    projectDiv.contains(addProjectBtn) ? addProjectBtn.remove() : null;
}

export function refreshProjectsList() {
    deleteProjectsList();
    createProjectList();
}

export function clearContentArea() {
    const contentDiv = document.querySelector(".content");
    contentDiv.textContent = "";
}

export function initUI() {
    createProjectList();
    bindButtons();
}
