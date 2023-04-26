import Task from '../models/Task';
import Project from '../models/Project';
import moment from "moment";

export let projectsStorage = (() => {
    let projects = [];

    // Default 'project" and 'tasks'
    let homeProject = new Project("home");
    let taskOne = new Task('brush teeth', 'with colgate', moment("2023-04-22"));
    let taskTwo = new Task('eat', 'yummy', moment("2023-04-26"));
    let taskThree = new Task('sleep', 'comfort', moment("2023-04-29"));

    homeProject.addTask(taskOne);
    homeProject.addTask(taskTwo);
    homeProject.addTask(taskThree);

    projects.push(homeProject);

    let dsadsa = new Project("21");
    projects.push(dsadsa);

    function getProjects() {
        return projects;
    }

    function getProject(proj_name) {
        return projects.find(proj => proj.name == proj_name);
    }

    function addProject(new_project) {
        projects.push(new_project)
    }

    function deleteProject(proj_name) {
        projects = projects.filter(proj => proj.name != proj_name);
    }

    return {getProjects, getProject, addProject, deleteProject};

})();