import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import Substring from '../../Substring';
import { Link } from 'react-router-dom';
import {localCommentStore} from '../../store/LocalCommentStore';

import './style.css';

class Comments extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
    }
    componentDidMount() {
        localCommentStore.getComments((items) => {
            this.setState({
                items: items
            });
        });
    }

    render() {
        const meta = {
            title: 'WebUI Test',
            description: 'WebUI Test'
        };
        return (
            <DocumentMeta {...meta}>
                <section>
                {
                    this.state.items.map((item, key) => 
                        <article key={key}>
                            <h1 className="article-title"><Substring text={item.name} length="20"/></h1>
                            <div className="article-mail">{item.email}</div>
                            <p className="article-comment"><Substring text={item.body} length="30"/></p>
                            <Link to={`/info/${item.id}`}>View</Link>
                        </article>
                    )
                }
                </section>
            </DocumentMeta>
        );
    }
}

export default Comments;