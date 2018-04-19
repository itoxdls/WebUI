import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import Article from '../../components/article';

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
        const items = this.state.items.map((item, key) => 
            <Article key={key} id={item.id} name={item.name} body={item.body} email={item.email}/>
        )
        return (
            <DocumentMeta {...meta}>
                <section>{items}</section>
            </DocumentMeta>
        );
    }
}

export default Comments;