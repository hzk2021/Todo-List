import moment from "moment";

class Project {
    name; tasks;
    constructor(name) {
        this.name = name,
        this.tasks = []
    }

    get name() {
        return this.name;
    }

    get tasks() {
        return this.tasks;
    }

    set name(new_name) {
        this.name = new_name
    }

    addTask(newTask) {
        if (this.tasks.find((task) => task.title == newTask.title)) return;
        this.tasks.push(newTask);
    }

    deleteAllTasks() {
        this.tasks = [];
    }

    deleteTask(task_title) {
        this.tasks = this.tasks.filter((task) => task.title !== task_title);
    }

    getTodayTasks() {
        return this.tasks.filter(task => moment(task.dueDate).format('LL') == moment().format('LL'));
    }

    getWeekTasks() {
        const now = moment();
        return this.tasks.filter(task => moment(task.dueDate).isoWeek() == now.isoWeek());
    }
}

export default Project;