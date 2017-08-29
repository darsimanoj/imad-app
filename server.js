var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles = {
    'article-1':{
    title: 'article1 manoj',
    heading: 'article1',
    date: 'aug 27,2017',
    content: ` <p>
                   i am manoj and this is my article1
               </p>
               <p>
                   i am manoj and this is my article1
               </p>
               <p>
                   i am manoj and this is my article1
               </p> `
    },
    'article-2':{
        title: 'article2 manoj',
    heading: 'article2',
    date: 'aug 27,2017',
    content: ` <p>
                   i am manoj and this is my article2
               </p>
               <p>
                   i am manoj and this is my article2
               </p>
               <p>
                   i am manoj and this is my article2
               </p> `
    },
    'article-3':{
    title: 'article3 manoj',
    heading: 'article3',
    date: 'aug 27,2017',
    content: ` <p>
                   i am manoj and this is my article3
               </p>
               <p>
                   i am manoj and this is my article3
               </p>
               <p>
                   i am manoj and this is my article3
               </p> `
        
    }
    
};

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date =data.date;
    var content =data.content;

         var htmlTemplate=`
    <html>
        <head>
            <title>
               ${title}
            </title>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        
        <body>
            <div class=container>
            <div>
                <a href="/">home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date}
            </div>
            <div>
                ${content}
            </div>
            </div>
            
        </body>
    </html>
           `;
           return htmlTemplate;
    
}
var counter=0;

app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var names = [];
app.get('/submit-name/:name',function(req,res){
    var name = req.params.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName',function(req,res){
    var articleName =req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
