const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    greeting: String,
    greeting2: [Int],
    course(id: Int!): Course,
    courses: [Course]
  },
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`;

var coursesData = [
  {
      id: 1,
      title: 'The Complete Node.js Developer Course',
      author: 'Andrew Mead, Rob Percival',
      description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
      id: 2,
      title: 'Node.js, Express & MongoDB Dev to Deployment',
      author: 'Brad Traversy',
      description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
      topic: 'Node.js',
      url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
      id: 3,
      title: 'JavaScript: Understanding The Weird Parts',
      author: 'Anthony Alicea',
      description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
      topic: 'JavaScript',
      url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
];


var getCourse = function(args) {
  console.log(args);
  var id = args.id;
  return coursesData.filter(course => {
      return course.id == id;
  })[0];
};

const resolvers = {
    Query: {
      greeting: () => 'Hello GraphQL world!👋',
      greeting2: () => [1,2,3],
      course: (_,{id},__,___) => {
        return coursesData.filter(course => {
          return course.id == id;
        })[0];
      },
      courses: ()=>coursesData
    }
};


const server = new ApolloServer({ typeDefs, resolvers });

server
.listen({ port: 9000 })
.then(serverInfo => console.log(`Server running at ${serverInfo.url}`));