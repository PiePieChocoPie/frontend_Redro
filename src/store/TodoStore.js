import { makeAutoObservable } from "mobx";

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(index) {
        this.todos.splice(index, 1);
    }
}

const todoStore = new TodoStore();
export default todoStore;