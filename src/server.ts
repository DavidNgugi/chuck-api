const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const chuck_schema = require('./schema/chuck');
const http = require('http');

// Initialize the app
const app = express();

app.use(cors());

app.get('/hello', (req:any, res: any) =>  res.send('Hello World!'));

// The GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: chuck_schema.schema,
    graphiql: true,
    customFormatErrorFn: (err: any) => {
        console.log(err.message);
        return err;
    }
}));

// error handler
app.use(function(err:any, req: any, res:any, next: Function) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Start the server
var server = http.createServer(app);

server.listen(process.env.PORT || 3000)
    .on('listening', () => console.log('Go to http://localhost:3000/graphql to run queries!'))
    .on('error', (error: any) => { throw error });
