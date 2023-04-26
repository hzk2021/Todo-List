import { projectsStorage } from '../data/storage.js';
import { clearContentArea } from './UI.js';
import { newClickBind } from '../dom/binding.js';

const contentDiv = document.getElementsByClassName('content')[0];

export function renderHomeContent() {
    clearContentArea();

    const projects = projectsStorage.getProjects();

    projects.forEach(proj => {
        proj.tasks.forEach(task => {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete!";

            newClickBind(deleteBtn, () => {
                proj.deleteTask(task.title);
                renderHomeContent();
            });

            contentDiv.append(task.title);  
            contentDiv.appendChild(deleteBtn);          
        });
    });
}

export function renderTodayContent() {
    clearContentArea();

    const projects = projectsStorage.getProjects();

    projects.forEach(proj => {
        proj.getTodayTasks().forEach(task => {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete!";

            newClickBind(deleteBtn, () => {
                proj.deleteTask(task.title);
                renderTodayContent();
            });

            contentDiv.append(task.title);  
            contentDiv.appendChild(deleteBtn);      
        });
    });
}

export function renderWeekContent() {
    clearContentArea();
    
    const projects = projectsStorage.getProjects();

    projects.forEach(proj => {
        proj.getWeekTasks().forEach(task => {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete!";

            newClickBind(deleteBtn, () => {
                proj.deleteTask(task.title);
                renderWeekContent();
            });

            contentDiv.append(task.title);  
            contentDiv.appendChild(deleteBtn); 
        });
    });
}

export function renderSpecificProjectContent(proj_name) {
    clearContentArea();

    const specificProject = projectsStorage.getProject(proj_name);

    specificProject.tasks.forEach(task => {

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete!";

        newClickBind(deleteBtn, () => {
            specificProject.deleteTask(task.title);
            renderSpecificProjectContent(specificProject.name);
        });

        contentDiv.append(task.title);  
        contentDiv.appendChild(deleteBtn);    
    });
}