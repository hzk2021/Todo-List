import bindButtons, {newClickBind} from '../dom/binding.js';
import { projectsStorage } from '../data/storage.js';
import { renderSpecificProjectContent, renderHomeContent } from './content.js';

function createProjectList() {
    const projectDiv = document.querySelector(".projects");
    const projectsUL = document.createElement("ul");
    
    const projects = projectsStorage.getProjects();
    projects.forEach(proj => {
        const projectLI = document.createElement("li");
        const projectName = document.createElement("span");
        projectName.textContent = proj.name;
        
        newClickBind(projectName, renderSpecificProjectContent.bind(this, proj.name));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "X";
        
        newClickBind(deleteBtn, () => {
            proj.deleteAllTasks();
            projectsStorage.deleteProject(proj.name);
            refreshProjectsList();
            renderHomeContent();
        });

        projectLI.appendChild(projectName);
        projectLI.appendChild(deleteBtn);

        projectsUL.appendChild(projectLI);
    });

    projectDiv.insertBefore(projectsUL, projectDiv.children[1]);
}

function deleteProjectsList() {
    const projectsUL = document.querySelector(".projects ul");
    projectsUL.textContent = ""
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
