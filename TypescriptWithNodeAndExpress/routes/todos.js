"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Added Todo', todo: newTodo, todos: todos });
});
router.delete('/todo/:todoId', (req, res) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
        return res.status(200).json({ message: 'Deleted the todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id' });
});
router.put('/todo/:todoId', (req, res) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'Editated todo', todos: todos });
    }
    res.status(404).json({ message: 'Could not find todo for this id' });
});
exports.default = router;
