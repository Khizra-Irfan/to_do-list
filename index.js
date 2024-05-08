#! /usr/bin/env node
import inquirer from "inquirer";
let todoList = [];
const todoMenu = async () => {
    let continueApp = true;
    while (continueApp) {
        const option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do: ",
                choices: ["Add Task", "Delete Task", "Update Task", "View Todo List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addTask();
        }
        else if (option.choice === "Delete Task") {
            await deleteTask();
        }
        else if (option.choice === "Update Task") {
            await editTask();
        }
        else if (option.choice === "View Todo List") {
            await viewTask();
        }
        else if (option.choice === "Exit") {
            continueApp = false;
        }
    }
};
const addTask = async () => {
    const new_task = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "What would you like to add in your todos?"
        },
    ]);
    todoList.push(new_task.task);
    viewTask();
};
const viewTask = () => {
    if (todoList.length === 0) {
        console.log("Your todo list is empty.");
        return;
    }
    console.log("\nYour Todo list:");
    todoList.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
};
const deleteTask = async () => {
    const deleteIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index of the task you want to delete: "
        }
    ]);
    if (deleteIndex.index > 0 && deleteIndex.index <= todoList.length) {
        todoList.splice(deleteIndex.index - 1, 1);
        console.log("Task deleted successfully. ");
    }
    else {
        console.log("Invalid index. Task not deleted. ");
    }
    viewTask();
};
const editTask = async () => {
    let taskEdit = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no' of the task you want to update: ",
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter the new task name: ",
        }
    ]);
    todoList[taskEdit.index - 1] = taskEdit.new_task;
    console.log("Task updated successfully. ");
    viewTask();
};
const main = async () => {
    await todoMenu();
};
main();
