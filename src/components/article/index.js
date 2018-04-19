import React, { Component } from 'react';
import Substring from '../../services/CommentUiService';
import { Link } from 'react-router-dom';

import './style.css';

class Article extends Component {
    
    render() {
        return (
            <article>
                <h1 className="article-title"><Substring text={this.props.name} length="20"/></h1>
                <div className="article-mail">{this.props.email}</div>
                <p className="article-comment"><Substring text={this.props.body} length="30"/></p>
                <Link to={`/info/${this.props.id}`}>View</Link>
            </article>
        );
    }
}

export default Article;