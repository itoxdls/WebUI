import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import LocalComments from '../../LocalComments';
import Substring from '../../Substring';
import { Link } from 'react-router-dom';

import './style.css';

class Comments extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        const localComments = new LocalComments();
        localComments
        .getHits()
        .then((data) => {
            console.log('end');
            this.setState({
                items: data
            });
        })
        .catch(error => console.error(error))
    }

    render() {
        const meta = {
            title: 'WebUI Test',
            description: 'WebUI Test'
        };
        console.log(this.state.items.length);
        return (
            <DocumentMeta {...meta}>
                <section>
                {
                    this.state.items.map((item, key) => 
                        <article key={item.id}>
                            <h1 className="article-title"><Substring text={item.name} length="20"/></h1>
                            <div className="article-mail">{item.email}</div>
                            <p className="article-comment"><Substring text={item.body} length="30"/></p>
                            <Link to={`/info/${key}`}>View</Link>
                        </article>
                    )
                }
                </section>
            </DocumentMeta>
        );
    }
}

export default Comments;
