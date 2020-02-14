import React from 'react'

import "./Todo.scss"

const Todo = ({ content, method }) => (
    <div className = "todo" onClick = {method}>
        <div className = "title">{content.title}</div>
        <span className = "body">{content.body } </span>
        <span className = "due">{`Due Date: ${content.due}`}</span>
    </div>
)
export default Todo
