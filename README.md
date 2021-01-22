# Chuck Norris API with GraphQL

A simple wrapper for the Chuck Norris API in NodeJs + GraphQL

## Installation

Clone repo

Install node modules and setup environment

```
npm install && cp .env.example .env
```

## Running the API

For local development:

```
npm run dev
````

For production:

```
npm run start
```

## Building project

Locally:
```
npm run build:dev
```

In Production:
```
npm run build
```

## Accessing the API

Use `http://127.0.0.1:{YOUR_PORT}/graphql` to test. I advise you to use Postman

## Queries and Mutations you have access to

1. Get a Random Joke

```
query {
    joke {
        icon_url
        id,
        url,
        value
    }
}
```

2. Get Joke Categories 

Lists out all the available categories

```
query {
    categories 
}
```

3. Get Joke by category

Just specify a category and boom.

```
mutation {
    findByCategory(category: "food") {
        value
    }
}
```

4. Free Text Search 

Just specify anything as a query

```
mutation {
    searchJoke(query: "norris") {
        value
    }
}
```