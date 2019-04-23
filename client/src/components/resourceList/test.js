import React from 'react'
import clientService from '../../services/ClientService'
import { Card, ResourceList, TextStyle, FilterType, Avatar, Page, Pagination } from '@shopify/polaris'

class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'],
            currentPage: 1,
            todosPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    onGetAllSuccess = evt => {
        this.setState({
            todos: evt.data
        })
    }

    onGetAllError = evt => {
        console.log('bye')
    }
    componentDidMount() {
        clientService.clientSearch('software', this.onGetAllSuccess, this.onGetAllError)
    }
    renderItem = (item) => {

        const { id, url, name, location } = item;
        const media = <Avatar customer size="medium" name={name} />;

        return (
            <ResourceList.Item id={id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
                <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                </h3>
                <div>{location}</div>
            </ResourceList.Item>
        );
    }
    render() {
        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        // const renderTodos = currentTodos.map((todo, index) => {
        //     return <li key={index}>{todo}</li>;
        // });

        const renderTodos = currentTodos.map((todo, index) => {
            console.log('todo', todo)
            const { id, url, name, location } = todo;
            const media = <Avatar customer size="medium" name={todo.name} />;

            return (
                <ResourceList.Item id={todo.id} url={url} media={media} accessibilityLabel={`View details for ${name}`}>
                    <h3>
                        hi   <TextStyle variation="strong">{todo.Name}</TextStyle>
                    </h3>
                    <div>{todo.Region}</div>
                </ResourceList.Item>
            );
        })

        console.log('render todos', renderTodos)

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        console.log('this.state', this.state)
        return (
            < div >
                <ul>
                    {renderTodos}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div >
        );
    }
}
export default TodoApp