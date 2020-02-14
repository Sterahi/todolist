import React from 'react'

export default class AddTodo extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                title: '',
                body: '',
                due: '',
                category: this.props.categories[0]
            }
            this.handleTitle    = this.handleTitle.bind(this)
            this.handleBody     = this.handleBody.bind(this)
            this.handleDue      = this.handleDue.bind(this)
            this.handleCategory = this.handleCategory.bind(this)

            // this.handleUpdate = this.handleUpdate.bind(this)

            this.addTodo = this.addTodo.bind(this)
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
        addTodo(e) {
            e.preventDefault()
            let newTodo = {
                title: this.state.title,
                body: this.state.body,
                due: this.state.due,
                category: this.state.category
            }
            this.props.update(newTodo)
            this.setState({
                title:'',
                body: '',
                due:'',
                category: this.props.categories[0]
            })
        }
        render () {
            let { categories } = this.props
            return(
                <div className = "col-xs-5 col-xs-offset-4">
                    <strong className = "todoHeader">Add Todo</strong>
                    <form className = "addTodo" onSubmit = { this.addTodo }>
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
                        <button type = "submit" className = "button">Add Task</button>
                    </form>
                </div>
            )
        }
}
