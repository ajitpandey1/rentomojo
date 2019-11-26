import React, { Component } from 'react';
import './userComment.component.scss';

export default class UserComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            isComment: false
        }
    }

    componentDidMount = () => {
        this.getPost(this.props.match.params.id);
    }
    getPost = async (id) => {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`
        const response = await fetch(url);
        const post = await response.json();
        this.setState({ post }, () => { this.getComment() });
    }
    getComment = async () => {
        const { post } = this.state;
        const url = `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        const response = await fetch(url);
        const comments = await response.json();
        this.setState({ comments });
    }

    deletePost = async (id) => {
        const { post } = this.state;
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const response = await fetch(url, { method: 'delete' });
        const comment = await response.json();
        window.location = `/post/${post.userId}`
    }
    
    render() {
        const { post, comments, isComment } = this.state;
        return (<div className="post-comment">

            <h2> Post Detail </h2>
            <div className="post-title-block">
                <div className="title">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
                <div className="button" onClick={() => { this.deletePost(post.id) }}><span>DELETE</span></div>
            </div>
            <div className="comment-block-section">
                <div className="comment-block">
                    <div className="comment-header">Comment</div>
                    <div onClick={() => { this.setState({ isComment: !isComment }) }} className="comment-show">{!isComment ? 'Show comment' : 'Hide comment'}</div>
                </div>
                {
                    isComment ?
                        <div className="comment-section">
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Comment</th>

                                </tr>
                                {
                                    comments.map((data) => {
                                        return (<tr>
                                            <td>{data.name}</td>
                                            <td>{data.body}</td>

                                        </tr>)
                                    })
                                }
                            </table>
                        </div> : null
                }
            </div>
        </div>)
    }
}

