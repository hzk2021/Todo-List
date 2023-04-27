class Task {
    title; description; dueDate;
    constructor(title, description, due_date) {
        this.title = title,
        this.description = description,
        this.dueDate = due_date;
    }

    get title() {
        return this.title;
    }

    get description() {
        return this.description;
    }

    get dueDate() {
        return this.dueDate;
    }

    set title(new_title) {
        this.title = new_title;
    }

    set description(new_description) {
        this.description = new_description;
    }

    set dueDate(new_date) {
        this.dueDate = new_date;
    }
}

export default Task;