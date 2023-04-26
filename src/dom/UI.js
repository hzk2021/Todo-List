import bindButtons, {newClickBind} from '../dom/binding.js';
import { projectsStorage } from '../data/storage.js';
import { renderSpecificProjectContent} from './content.js';

function createProjectList() {
    const projectDiv = document.querySelector(".projects");
    const projectsUL = document.createElement("ul");
    
    const projects = projectsStorage.getProjects();
    projects.forEach(proj => {
        const projectLI = document.createElement("li");
        projectLI.textContent = proj.name;
        
        newClickBind(projectLI, renderSpecificProjectContent.bind(this, proj.name));

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
