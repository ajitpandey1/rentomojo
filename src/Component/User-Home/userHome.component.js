import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './userHome.component.scss'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = async () => {
        const url = 'https://jsonplaceholder.typicode.com/users'
        const response = await fetch(url);
        const users = await response.json()||[];
        this.setState({ users });
    }

    getBlogs = (data) => {
        window.location = `/post/${data.id}`
    }
    render() {
        const { users } = this.state;
        return (
            <div className="home-scene">
                <h2>Users List</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Blog posts</th>
                    </tr>
                    {
                        users.map((data) => {
                            return (<tr>
                                <td>{data.name}</td>
                                <td>{data.company.name}</td>
                                <td onClick={() => { this.getBlogs(data) }} className="view-post">View post</td>
                            </tr>)
                        })
                    }
                </table>

            </div>)
    }
}