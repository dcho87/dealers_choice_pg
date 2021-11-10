const db = require('./db');
const {conn, syncAndSeed}= db;
const {Books} = db.models;
const express = require('express')
const app = express();

app.get('/', async(req, res, next)=> {
    try{
        const books = await Books.findAll();
        res.send(`
        <html>
        <head>
        <title> Amazon's Best Seller </title>
        </head>
        <body>
        <h1>Best Seller 2021</h1>
        <ol>
        ${books.map(book => `
            <li>
            ${book.title}
            <a href="/books/${book.title}"> Detail </a>
            </li>
        `).join('')}
        </ol>
        </body>
        </html>
        `)
    }
    catch(ex){
        next(ex)
    }
})

app.get('/books/:title', async(req, res, next)=> {
    try{
        const title = req.params.title;
        const books = await Books.findAll({
            where: { title }
        });
        res.send(`
        <html>
        <head>
        <title> ${title} </title>
        </head>
        <body>
        <h1>${title}</h1>
        <a href='/'>Home</a><p></p>
        <div class="item">
        ${
            books.map( book => {
                return `
                <p>
                ${book.title} (By: ${book.author})
                </p>
                <p>About the author: ${book.about}</p>
                `
            })
        }     
         </div>
        </body>
        </html>
        `)
    }
    catch(ex){
        next(ex)
    }
})

const init = async() => {
    try{
    await conn.authenticate();
    await db.syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> 
    console.log(`listening on port ${port}`))
    }
    catch(ex){
        console.log(ex)
    }
};

init();