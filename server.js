const fs = require('fs');

const cors = require('cors');
const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
input WhoInput {
    who: String!
}

type ReservationResponse {
    status: String!
    message: String!
}

type Reservation {
    id: ID!
    who: String!
    time: String!
}

type Query {
    getReservations: [Reservation!]!
}

type Mutation {
    updateReservation(id: ID!, input: WhoInput!): ReservationResponse!
}
`);

// The root provides a resolver function for each API endpoint
const root = {
  getReservations: () => {
    return JSON.parse(fs.readFileSync('./data.json'));
  },
  updateReservation: ({id, input}) => {
    let data = JSON.parse(fs.readFileSync('./data.json'));

    for (let i in data) {
      if (data[i].id == id) {
        data[i].who = input.who;
      }
    }

    console.log(data);

    fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8');

    return { status: "success", message: "Reservation added successfully!" };
  },
};

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
