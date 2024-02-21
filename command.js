class Command {
    execute() {
        throw new Error("This method must be implemented by subclasses");
    }
}

class AddTaskCommand extends Command {
    constructor(todolist, task) {
        super();
        this.todolist = todolist;
        this.task = task;
    }

    execute() {
        this.todolist.addTask(this.task);
    }
}

class RemoveTaskCommand extends Command {
    constructor(todolist, index) {
        super();
        this.todolist = todolist;
        this.index = index;
    }

    execute() {
        this.todolist.removeTask(this.index);
    }
}

class CompleteTaskCommand extends Command {
    constructor(todolist, index) {
        super();
        this.todolist = todolist;
        this.index = index;
    }

    execute() {
        this.todolist.completeTask(this.index);
    }
}

class TodoList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.render();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.render();
    }

    completeTask(index) {
        this.tasks[index] += " (Completed)";
        this.render();
    }

    render() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.textContent = task;
            taskList.appendChild(listItem);
        });
    }
}

const todolist = new TodoList();

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task !== "") {
        const command = new AddTaskCommand(todolist, task);
        command.execute();
        taskInput.value = "";
    }
}

function removeTask() {
    const taskList = document.getElementById("taskList");
    const listItems = taskList.querySelectorAll("li");
    listItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const command = new RemoveTaskCommand(todolist, index);
            command.execute();
        });
    });
}

function completeTask() {
    const taskList = document.getElementById("taskList");
    const listItems = taskList.querySelectorAll("li");
    listItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            const command = new CompleteTaskCommand(todolist, index);
            command.execute();
        });
    });
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("removeTaskBtn").addEventListener("click", removeTask);
document.getElementById("completeTaskBtn").addEventListener("click", completeTask);
