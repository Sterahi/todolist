import React from 'react'

import Todo from "../Todo/Todo"
import AddTodo from "../AddTodo/AddTodo"
import UpdateTodo from "../UpdateTodo/UpdateTodo"

import './TodoList.scss'
export default class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            categories: ['Todo', 'In Progress', 'Done'],
            todos: [
                { id: 0, title: 'Sample Todo', body: 'This is just a sample todo, do with it what you will.', due: new Date(Date.now()).toISOString().split(',')[0].split('T')[0], category: 'Todo' },
                { id: 1, title: 'Sample Todo 2', body: 'This is just a sample todo, do with it what you will.', due: new Date(Date.now()).toISOString().split(',')[0].split('T')[0], category: 'Todo' }
            ],
            method: 'create',
            editTarget: ''
        }
        this.addTodo = this.addTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }
    editTodo(e) {
        this.setState({
            method: 'edit',
            editTarget: arguments[0]
        })
    }

    addTodo(newTodo) {
        newTodo['id'] = this.state.todos[this.state.todos.length - 1].id + 1
        const todos = [...this.state.todos, newTodo]
        console.log(newTodo)
        if(newTodo.title !== '' && newTodo.body !== '' && newTodo.due !== '') {
            this.setState({
                todos: todos
            })
        }
    }

    updateTodo(newTodo) {
        let { todos } = this.state
        todos[newTodo.id] = newTodo
        if(newTodo.title !== '' && newTodo.body !== '' && newTodo.due !== '') {
            this.setState({
                todos: todos,
                method: 'create'
            })
        }
    }

    deleteTodo(removeTodo) {
        const newTodos = this.state.todos.filter(todo => {
            return todo.id !== removeTodo
        })
        this.setState({
            todos: newTodos
        })
    }

    cancelEdit() {
        this.setState({
            method: 'create'
        })
    }
    displayForm() {
        if(this.state.method !== 'edit') {
            return <AddTodo update = { this.addTodo } categories = { this.state.categories } />
        } else {
            return <UpdateTodo update = { this.updateTodo } categories = { this.state.categories } todo = { this.state.editTarget } cancel = {this.cancelEdit} delete = { this.deleteTodo }/>

        }
    }

    render() {
        let { categories, todos } = this.state
        return (
            <div className = "row center-xs middle-xs">
                <div className = "col-xs-12">
                    <h1>Todos</h1>
                    {this.displayForm()}
                </div>
                <div className ="container">
                    <div className = "row center-xs around-xs ">
                        {
                            (categories||[]).map((category, id) => {
                                return (
                                    <div className = "col-xs-5 col-md-3 list" key = { id }>
                                        <div className = "header">{category}</div>
                                        {
                                            (todos||[]).map((todo, id) => {
                                                if(category === todo.category) {
                                                    return(
                                                        <Todo content = { todo } method = { this.editTodo.bind(this, todo) } key = { id }/>
                                                    )
                                                } else {
                                                    return(
                                                        ''
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
