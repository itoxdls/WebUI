class LocalComments {
    key = 'comments';
    hits = [];
    constructor(){
      const hits = localStorage.getItem(this.key);
      if (hits) {
        console.log(`cache:comments`);
        this.hits = JSON.parse(hits);
      }
    }

    load(p, fn, check, isDone = false){
        if (isDone) return 
        return fn(p).then(data => this.load(++p, fn, check, check(data))); 
    }

    isHits(){
        return this.hits.length === 0 ? false : true;
    }

    getHits(){
        if(!this.isHits()){
            return this.load(1, (p) => {
                console.log(`request: /posts/${p}/comments`);
                return fetch(`http://jsonplaceholder.typicode.com/posts/${p}/comments`)
                .then(response => { return response.json() });
            }, (data) => {
                data.forEach(e => {
                    this.hits.push(e);
                });
                return data.length > 0 ? false : true;
            }).then(() => {
                localStorage.setItem(this.key, JSON.stringify(this.hits));
                return new Promise((resolve, reject) => {
                    resolve(this.hits);
                });
            });
        }
        return new Promise((resolve, reject) => {
            resolve(this.hits);
        });
    }

    getHit(id){
        if (!this.hits || !this.hits[id]) {
            return false;
        }
        return this.hits[id];
    }
}

export default LocalComments;