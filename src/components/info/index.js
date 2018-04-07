import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import './style.css';

class Info extends Component {
    goBack(){
        window.history.back();
    }

    render() {
        const { match : { params } } = this.props;
        
        const hits = localStorage.getItem('comments');
        const hitsson = JSON.parse(hits);
        if (!hits || !hitsson[params.id]) {
            return (
                <h1>Empty info</h1>
            );
        }
        
        let item = hitsson[params.id];
        const meta = {
            title: `${item.name} - WebUI Test`,
            description: item.name
        };

        return (
            <DocumentMeta {...meta}>
                <Button bsStyle="link" onClick={()=>this.goBack()}>
                    <Glyphicon glyph="align-right"/> Back
                </Button>
                <article key={item.id}>
                    <h1 className="article-title">{item.name}</h1>
                    <div className="article-mail">{item.email}</div>
                    <p className="article-comment">{item.body}</p>
                </article>
            </DocumentMeta>
        );
    }
}

export default Info;
