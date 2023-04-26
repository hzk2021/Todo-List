import { projectsStorage } from '../data/storage.js';
import { clearContentArea } from './UI.js';
import { newClickBind } from '../dom/binding.js';
import Task from '../models/Task';
import Project from '../models/Project';
import moment from "moment";

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

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task!";

    newClickBind(addTaskBtn, () => {

        // To Change
        const taskName = prompt("Task Name?");

        const dsa = new Task(taskName, "dsadsa", moment());
        projects[0].addTask(dsa);

        renderHomeContent();
    })
    contentDiv.appendChild(addTaskBtn);
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

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task!";

    newClickBind(addTaskBtn, () => {

        // To Change
        const taskName = prompt("Task Name?");

        const dsa = new Task(taskName, "dsadsa", moment());
        specificProject.addTask(dsa);

        renderSpecificProjectContent(specificProject.name);

    })
    contentDiv.appendChild(addTaskBtn);
}