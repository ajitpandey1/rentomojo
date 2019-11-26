import React, { Component } from 'react';

import './blogPost.component.scss';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: []
        }
    }

    componentDidMount = () => {
        this.getPost(this.props.match.params.id);
    }

    getPost = async (id) => {
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${id}&skip= 0&limit=10`
        const response = await fetch(url);
        const post = await response.json()||[];
        this.setState({ post });
    }

    getBlogs = (data) => {
        window.location = `/detail/${data.id}`
    }
    render() {
        const { post } = this.state;
        return (<div className="post-block">
            <h2>Posts</h2>
            <div className="posts">
                {
                    post.map((data) => {
                        return <div onClick={() => { this.getBlogs(data) }} className="post-section">{data.title}</div>
                    })
                }
            </div>


        </div>)
    }
}

