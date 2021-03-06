import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import {localCommentStore} from '../../store/LocalCommentStore';
import './style.css';

class Info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        const { match : { params } } = this.props;
        localCommentStore.getComments(() => {
            this.setState({
                item: localCommentStore.getComment(params.id)
            });
        });
    }

    goBack(){
        window.history.back();
    }

    render() {
        if (!this.state.item) {
            return (
                <h1>Loading...</h1>
            );
        }
        const meta = {
            title: `${this.state.item.name} - WebUI Test`,
            description: this.state.item.name
        };
        return (
            <DocumentMeta {...meta}>
                <Button bsStyle="link" onClick={()=>this.goBack()}>
                    <Glyphicon glyph="align-right"/> Back
                </Button>
                <article key={this.state.item.id}>
                    <h1 className="article-title">{`id: ${this.state.item.id} - ${this.state.item.name}`}</h1>
                    <div className="article-mail">{this.state.item.email}</div>
                    <p className="article-comment">{this.state.item.body}</p>
                </article>
            </DocumentMeta>
        );
    }
}

export default Info;
