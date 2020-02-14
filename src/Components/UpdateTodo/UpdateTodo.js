import React from 'react'

export default class UpdateTodo extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                title: this.props.todo.title,
                body: this.props.todo.body,
                due: new Date(this.props.todo.due).toISOString().split(',')[0].split('T')[0],
                category: this.props.todo.category
            }
            this.handleTitle    = this.handleTitle.bind(this)
            this.handleBody     = this.handleBody.bind(this)
            this.handleDue      = this.handleDue.bind(this)
            this.handleCategory = this.handleCategory.bind(this)

            this.updateTodo = this.updateTodo.bind(this)

            this.deleteTodo = this.deleteTodo.bind(this)
        }

        handleTitle(e) {
            this.setState({
                title: e.target.value
            })
        }

        handleBody(e) {
            this.setState({
                body: e.target.value
            })
        }
        handleDue(e) {
            this.setState({
                due: e.target.value
            })
        }
        handleCategory(e) {
            this.setState({
                category: e.target.value
            })
        }

        updateTodo(e) {
            e.preventDefault()
            let newTodo = {
                id: this.props.todo.id,
                title: this.state.title,
                body: this.state.body,
                due: this.state.due,
                category: this.state.category
            }
            this.props.update(newTodo)
            this.setState({
                title:'',
                body: '',
                due:''
            })
        }
        deleteTodo() {
            this.props.delete(this.props.todo.id)
        }
        render () {
            let { categories } = this.props
            return(
                <div className = "col-xs-5 col-xs-offset-4">
                    <strong className = "todoHeader">Edit Todo</strong>
                    <form className = "addTodo" onSubmit = { this.updateTodo }>
                        <input onChange = { this.handleTitle } placeholder = "Title" value = { this.state.title } name = "Title" />
                        <input onChange = { this.handleBody  } placeholder = "Body"  value = { this.state.body  } name = "Body"  />
                        <input onChange = { this.handleDue   } placeholder = "Due"   value = { this.state.due   } name = "Due"   type = 'date'/>
                        <select onChange = { this.handleCategory }>
                            {
                                (categories||[]).map((category, id) => {
                                    return(
                                        <option key = { id } value = { category }>{category}</option>
                                    )
                                })
                            }
                        </select>
                        <button type = "submit" className = "button col-xs-3">Update Task</button>
                        <button className = "button col-xs-3" onClick = {this.deleteTodo }>Delete Task</button>
                        <button className = "button col-xs-3" onClick = {this.props.cancel}>Cancel Edit</button>
                    </form>
                </div>
            )
        }
}
