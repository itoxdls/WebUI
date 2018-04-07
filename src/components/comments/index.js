import React, { Component } from 'react';

import './style.css';

class Comments extends Component {
    constructor(){
        super();
        this.state = { hits: null }

        const hits = localStorage.getItem('comments');
        if (hits) {
            this.state = { hits: JSON.parse(hits) };
            return;
        }
    }

    subStringText(text, length){
        return text.length <= length ? text : text.slice(0, length - 3) + '...';
    }

    render() {
        return (
            <section>
                {
                this.state.hits &&
                this.state.hits.map((item, key) => 
                    <article key={key}>
                        <h1 className="article-title">{this.subStringText(item.name, 20)}</h1>
                        <div className="article-mail">{item.email}</div>
                        <p className="article-comment">{this.subStringText(item.body, 30)}</p>
                    </article>
                    )
                }
            </section>
        );
    }
}

export default Comments;
