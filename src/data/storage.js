import Task from '../models/Task';
import Project from '../models/Project';
import moment from "moment";

export let projectsStorage = (() => {

    let projects = JSON.parse(localStorage.getItem("projects") || "[]");

    if (projects == [] || projects == null || projects.length == 0) {
        // Default 'project" and 'tasks'
        let homeProject = new Project("home");
        let taskOne = new Task('brush teeth', 'hygiene is important!', moment("2023-04-22"));
        let taskTwo = new Task('workout', 'need to keep fit', moment("2023-04-26"));
        let taskThree = new Task('revision', 'study!!!', moment("2023-04-29"));

        homeProject.addTask(taskOne);
        homeProject.addTask(taskTwo);
        homeProject.addTask(taskThree);

        projects.push(homeProject);
    }

    function getProjects() {

        const projs = projects.map((proj) => {
            const deserializeProject = new Project(proj.name);
            proj.tasks.forEach(task => {
                const newTask = new Task(task.title, task.description, task.dueDate);
                deserializeProject.addTask(newTask);

                return task;
            });
            return deserializeProject;
        });

        localStorage.setItem('projects', JSON.stringify(projects));

        return projs;

    }

    function getProject(proj_name) {

        localStorage.setItem('projects', JSON.stringify(projects));

        return getProjects().find(proj => proj.name == proj_name);
    }

    function addProject(new_project) {
        projects.push(new_project);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function deleteProject(proj_name) {
        projects = projects.filter(proj => proj.name != proj_name);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    function saveLocalAll(updated_projects) {
        projects = updated_projects;
    }
    
    return {getProjects, getProject, addProject, deleteProject, saveLocalAll};

})();