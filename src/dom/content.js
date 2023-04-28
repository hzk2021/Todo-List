import { projectsStorage } from '../data/storage.js';
import { clearContentArea } from './UI.js';
import { newClickBind } from '../dom/binding.js';
import Task from '../models/Task';
import Project from '../models/Project';
import moment from "moment";

const contentDiv = document.getElementsByClassName('content')[0];
const homeBtn = document.getElementById("home-btn");
const todayBtn = document.getElementById("today-btn");
const thisWeekBtn = document.getElementById("this-week-btn");

export function removeAllHighlight() {
    homeBtn.classList.remove("selected");
    todayBtn.classList.remove("selected");
    thisWeekBtn.classList.remove("selected");

    document.querySelector(".projects ul").childNodes.forEach(node => {
        node.classList.remove("selected");
    });

}

export function createButtonBinding(text, action) {
    const newBtn = document.createElement('button');
    newBtn.textContent = text;
    
    newClickBind(newBtn, action);

    return newBtn;
}

export function renderHomeContent() {
    clearContentArea();

    removeAllHighlight();
    homeBtn.classList.add("selected");

    const section = document.createElement("h1");
    section.textContent = "Name"
    contentDiv.append(section);
    const projects = projectsStorage.getProjects();

    projects.forEach(proj => {
        proj.tasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add('taskContainer');

            const detailsBtn = createButtonBinding('Details', () => {
                alert(`\nTitle: ${task.title}\n\nDescription: ${task.description} \n\nDue Date: ${moment(task.dueDate).format('LL')}`);
            });

            const editBtn = createButtonBinding('🖊️', () => {
                const newTitle = prompt("New Title?", task.title);
                const newDescription = prompt("New Description?", task.description);
                const date = prompt("Due Date? (DD/MM/YYYY)", moment(task.dueDate).format("DD/MM/YYYY"));

                if (newTitle == null || newTitle == "" || newDescription == null || newDescription == "") return;

                task.title = newTitle;
                task.description = newDescription;
                task.dueDate = moment(date, "DD/MM/YYYY");

                projectsStorage.saveLocalAll(projects);

                renderHomeContent();
            });

            const deleteBtn = createButtonBinding('🗑️', () => {
                proj.deleteTask(task.title);

                projectsStorage.saveLocalAll(projects);
                renderHomeContent();
            });

            taskDiv.append(task.title)

            const optionsDiv = document.createElement("div");
            optionsDiv.appendChild(detailsBtn);
            optionsDiv.appendChild(editBtn);
            optionsDiv.appendChild(deleteBtn);
            taskDiv.appendChild(optionsDiv);

            contentDiv.append(taskDiv);
        });
    });

    const addTaskBtn = createButtonBinding('Add Task', () => {

        // Create Add Task UI
        const taskName = prompt("Task Name?");
        const taskDescription = prompt("Description?");
        const date = prompt("Due Date? (DD/MM/YYYY)", moment().format("DD/MM/YYYY"));

        if (taskName == null || taskName == "" || taskDescription == null || taskDescription == "") return;

        const newTask = new Task(taskName, taskDescription, moment(date, "DD/MM/YYYY"));
        projects[0].addTask(newTask);

        projectsStorage.saveLocalAll(projects);
        renderHomeContent();
    })
    addTaskBtn.classList.add("add-task-btn");

    contentDiv.appendChild(addTaskBtn);
}

export function renderTodayContent() {
    clearContentArea();

    removeAllHighlight();
    todayBtn.classList.add("selected");

    const section = document.createElement("h1");
    section.textContent = "Today"
    contentDiv.append(section);
    const projects = projectsStorage.getProjects();

    projects.forEach(proj => {
        proj.getTodayTasks().forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add('taskContainer');

            const detailsBtn = createButtonBinding('Details', () => {
                alert(`\nTitle: ${task.title}\n\nDescription: ${task.description} \n\nDue Date: ${moment(task.dueDate).format('LL')}`);
            });

            const editBtn = createButtonBinding('🖊️', () => {
                const newTitle = prompt("New Title?", task.title);
                const newDescription = prompt("New Description?", task.description);
                const date = prompt("Due Date? (DD/MM/YYYY)", moment(task.dueDate).format("DD/MM/YYYY"));

                if (newTitle == null || newTitle == "" || newDescription == null || newDescription == "") return;

                task.title = newTitle;
                task.description = newDescription;
                task.dueDate = moment(date, "DD/MM/YYYY");

                projectsStorage.saveLocalAll(projects);

                renderTodayContent();
            });

            const deleteBtn = createButtonBinding('Delete!', () => {
                proj.deleteTask(task.title);

                projectsStorage.saveLocalAll(projects);

                renderTodayContent();
            });

            taskDiv.append(task.title)

            const optionsDiv = document.createElement("div");
            optionsDiv.appendChild(detailsBtn);
            optionsDiv.appendChild(editBtn);
            optionsDiv.appendChild(deleteBtn);
            taskDiv.appendChild(optionsDiv);

            contentDiv.append(taskDiv);
   
        });
    });
}

export function renderWeekContent() {
    clearContentArea();
    
    removeAllHighlight();
    thisWeekBtn.classList.add("selected");

    const section = document.createElement("h1");
    section.textContent = "This Week"
    contentDiv.append(section);

    const projects = projectsStorage.getProjects();

    projects.forEach(proj => {
        proj.getWeekTasks().forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add('taskContainer');

            const detailsBtn = createButtonBinding('Details', () => {
                alert(`\nTitle: ${task.title}\n\nDescription: ${task.description} \n\nDue Date: ${moment(task.dueDate).format('LL')}`);
            });

            const editBtn = createButtonBinding('🖊️', () => {
                const newTitle = prompt("New Title?", task.title);
                const newDescription = prompt("New Description?", task.description);
                const date = prompt("Due Date? (DD/MM/YYYY)", moment(task.dueDate).format("DD/MM/YYYY"));

                if (newTitle == null || newTitle == "" || newDescription == null || newDescription == "") return;

                task.title = newTitle;
                task.description = newDescription;
                task.dueDate = moment(date, "DD/MM/YYYY");
                
                projectsStorage.saveLocalAll(projects);

                renderWeekContent();
            });

            const deleteBtn = createButtonBinding('🗑️', () => {
                proj.deleteTask(task.title);
                
                projectsStorage.saveLocalAll(projects);

                renderWeekContent();
            });

            taskDiv.append(task.title)

            const optionsDiv = document.createElement("div");
            optionsDiv.appendChild(detailsBtn);
            optionsDiv.appendChild(editBtn);
            optionsDiv.appendChild(deleteBtn);
            taskDiv.appendChild(optionsDiv);

            contentDiv.append(taskDiv);
        });
    });
}

export function renderSpecificProjectContent(proj_name) {
    clearContentArea();

    removeAllHighlight();
    document.querySelector(".projects ul").childNodes.forEach(node => {
        node.firstChild.textContent == proj_name ? node.classList.add("selected") : null;
    });

    const section = document.createElement("h1");
    section.textContent = `Project: ${proj_name}`;
    contentDiv.append(section);

    const projects = projectsStorage.getProjects();
    const specificProject = projects.find(proj => proj.name == proj_name);
    specificProject.tasks.forEach(task => {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add('taskContainer');

        const detailsBtn = createButtonBinding('Details', () => {
            alert(`\nTitle: ${task.title}\n\nDescription: ${task.description} \n\nDue Date: ${moment(task.dueDate).format('LL')}`);
        });

        const editBtn = createButtonBinding('🖊️', () => {
            const newTitle = prompt("New Title?", task.title);
            const newDescription = prompt("New Description?", task.description);
            const date = prompt("Due Date? (DD/MM/YYYY)", moment(task.dueDate).format("DD/MM/YYYY"));

            if (newTitle == null || newTitle == "" || newDescription == null || newDescription == "") return;

            task.title = newTitle;
            task.description = newDescription;
            task.dueDate = moment(date, "DD/MM/YYYY");

            projectsStorage.saveLocalAll(projects);

            renderSpecificProjectContent(specificProject.name);
        });

        const deleteBtn = createButtonBinding('🗑️', () => {
            specificProject.deleteTask(task.title);

            projectsStorage.saveLocalAll(projects);

            renderSpecificProjectContent(specificProject.name);
        });

        taskDiv.append(task.title)

        const optionsDiv = document.createElement("div");
        optionsDiv.appendChild(detailsBtn);
        optionsDiv.appendChild(editBtn);
        optionsDiv.appendChild(deleteBtn);
        taskDiv.appendChild(optionsDiv);

        contentDiv.append(taskDiv);   
    });

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task!";
    addTaskBtn.classList.add("add-task-btn");

    newClickBind(addTaskBtn, () => {

        // Create Add Task UI
        const taskName = prompt("Task Name?");
        const taskDescription = prompt("Description?");
        const date = prompt("Due Date? (DD/MM/YYYY)", moment().format("DD/MM/YYYY"));

        if (taskName == null || taskName == "" || taskDescription == null || taskDescription == "") return;

        const newTask = new Task(taskName, taskDescription, moment(date, "DD/MM/YYYY"));
        specificProject.addTask(newTask);

        projectsStorage.saveLocalAll(projects);

        renderSpecificProjectContent(specificProject.name);

    })
    contentDiv.appendChild(addTaskBtn);
}