import { Router } from "express";

import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
     res.status(200).json({todos: todos});
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo ={
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);

    res.status(201).json({message: 'Added Todo', todo: newTodo, todos: todos})
})

router.delete('/todo/:todoId', (req, res) =>{
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((todoItem) =>  todoItem.id === tid);
    if(todoIndex >= 0){
        todos =  todos.filter((todoItem) => todoItem.id !== params.todoId);
        return res.status(200).json({message: 'Deleted the todo', todos: todos});
    }
    res.status(404).json({message: 'Could not find todo for this id'});
})

router.put('/todo/:todoId', (req, res) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex((todoItem) =>  todoItem.id === tid);
    if(todoIndex >= 0){
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text};
        return res.status(200).json({message: 'Editated todo', todos: todos});
    }
    res.status(404).json({message: 'Could not find todo for this id'});
})

export default router;