<h1 align ="center">The World Mapper</h1>

##### Author: Thomas Yeung

<br>

## Description

The World Data Mapper is an application for managing regional data that is organized hierarchically. The application will allow the user to organize and edit hierarchical
regions. Note a subregion denotes a region that is contained within its parent. A sibling would have the same parent but no overlap with another sibling. So, for example, Alabama and Alaska have the same parent, the USA, so they are siblings. In this application we can organize this data and edit information about each region’s name, capital, leader, and landmarks.

Below is a gif that shows the general idea of this application.

<p align = "center">
  <img src = "https://user-images.githubusercontent.com/76235739/120563937-c2e36700-c3d7-11eb-9ac7-3560b8d008a8.gif" width = "700" height = "350" >
</p>

## Getting Started

Before trying to run TheWorldMapper, make sure Node.js is installed on your machine (https://nodejs.org/en/). Either clone or download this git repository https://github.com/thomasyeung687/TheWorldMapper. In the TheWorldMapper folder, complete the following steps:

- Go to .env to connect to your own MongoDB database by editing the MONGO_URI with the correct item and provide the two token secrets (a default for both will be provided)

  - the MONGO_URI should look something like this

  ```
  mongodb+srv://<username>:<password>@cluster0.9lf0w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

  Replace <password> with the password for the <username> user. Replace myFirstDatabase with the name of the database that connections will use by default. Ensure any option params are URL encoded.
  ```

- In the root directory run '`npm install`'
- Go to the client directory(./client) using '`cd client`' and run '`npm install`' again.
- Return to the root directory using '`cd ..`'
- Run 'npm start' to start the application

<br>

The World Mapper application should launch automatically in a new window.

<br>

## Navigating the UI

- **Homepage** Upon logging in or signing up, you will be directed to your maps page.

<p align = "center">
  <img src = "https://user-images.githubusercontent.com/76235739/120562978-8a428e00-c3d5-11eb-85c2-e12889b25655.gif" width = "700" height = "350" >
</p>
<br>

- **Your Maps**

  - Here you will be able to to view all your maps, edit a map's name, or click into a map to see its subregions on the region spreadsheet page. You will also be able to add a new map as well as delete an existing one.

  - _Nav Bar_
    - To edit your account credentials and information, click on your name next to the "Logout" button
    - To log out you click the "Logout" button

<p align ="center"><img src = "https://user-images.githubusercontent.com/76235739/120563267-2c627600-c3d6-11eb-9d7a-a2b6c963c00b.gif" width = "700" height = "350"></p>
<br>

- **Region SpreadSheet**

  - Here you will be able to see the subregions of the region is being currently viewed indicated by the title [Region: ________ ] on top of the spreadsheet as well as in the nav bar as the region that is grayed out and unclickable.

  - _Nav Bar_

    - To go back to Your Maps, you can click on the logo at the top left that says "THE WORLD MAPPER"
    - Traversing to a parent region is done by single clicking the name of the parent region you wish to go to in the path shown in the nav bar that looks something like:
      - The World > North America > New York

  - _Traversing into a subregion_

    - Traversing to a subregion is done by single clicking the name column of the subregion you wish to traverse to.
    - This will allow you to see and edit the subregions of that subregion.
    - It will also change the nav bar making the parent region clickable. When you click on a parent region, it will allow you to traverse back to that region.

  - _SpreadSheet Functions_

    - **To add** a new subregion click on the **plus button**.
    - **To delete** a subregion click on the **x button** at the start of the subregion
    - **To undo or redo** a edit, addition, or deletion, use the **undo redo** buttons
    - **To sort by Name, Capital, or Leader** click on the corresponding button in the red section of the spreadsheet
    - **Editing the name** of a subregion is done by **double clicking on the name column** of the entry you wish to edit.
    - **Traversing to a subregion** is done by **single clicking the name column** of the subregion you wish to traverse to.
    - **Editing the capital** or the **leader** is done by a **single click**.
    - **The flags are auto generated** if the user provides a state or country that exists. By default it will have "FLAG" as a placeholder.
    - **To go to the Region Viewer page**, you **click on the landmarks column** of the entry you wish to view.
    - **Cool Feature** when editing a column, you can use your **arrow keys** to edit the column next to it or edit the row above or below it.

<p align ="center"><img src = "https://user-images.githubusercontent.com/76235739/120563454-a2ff7380-c3d6-11eb-8be3-beefc8ffdd5e.gif" width = "700" height = "350"></p>
<br>

- **Region Viewer**

  - This page can be separated into 3 sections:
    - the nav bar
    - left side / Region's Information
    - right side / Region's Landmarks.
  - _Nav Bar_

    - The nav bar now has **left and right arrows** to traverse between subregions in the Region Viewer

  - _Left Side/ Region's Information_

    - Undo Redo buttons to undo redo operations.
    - Lists the Name, Capital, Leader, and the number of subregions of the region we are currently viewing.
    - **To go back to the Region Spreadsheet** click on the blue Parent Region text.
    - **To change region's Parent Region**, click on the pen button and a drop down menu will show where you can select the new parent region.

  - _Right Side / Region's Landmarks_
    - Displays all the landmarks of this region.
      - **Edit** the landmark by **clicking on the name** of the landmark
      - **Delete** the landmark by **clicking on the red x** to the left of the landmark
    - Displays the landmarks of this region's subregions.
      - Cannot be edited
    - To **Add** a landmark, use the textbox at the bottom and when you are done typing the name of the landmark, click the plus button on the left

<p align = "center"><img src = "https://user-images.githubusercontent.com/76235739/120564966-0b038900-c3da-11eb-9fb2-ddad352ffddb.gif" width = "700" height = "350"></p>
<br>

## Built With

```
Technologies Used: React.js, Node.js, Express.js, Mongoose, MongoDB, Apollo Server, GraphQL Git, JS, HTML, CSS, JSX, Bootstrap, Axios, Babel, JSON Web Token, JS-Cookie, Cors, Nodemon, React Router
```

## More Information

##### Configuring .env

The backend utilizes a .env file to store a few constants which are necessary for the application to function. Some of that information is already there, such as the port numbers for the front and backend servers, as well as the client URL. The refresh and access token secrets are random character sequences used to sign and verify JWTs used by the authentication system. These are essentially passwords that the JWT middleware uses to hash login info, to both save new users and to verify returning ones. Use a site like https://passwordsgenerator.net/, or just come up with a random string yourself for these values. There isn't a hard length requirement on the secret, but smaller keys are more easy to guess by malicious actors, so 32 characters(256 bits) are recommended.

### Backend

##### Index and Server-Config

Index.js is the main entry point for the backend; it handles the creation of the server(s), applies middleware to the server, and defines the database connection. Server-Config is an optional file meant to help organize the middleware used by the server.

In this example application, enough middleware code exists to the point where index.js would become difficult to parse, so for the sake of retaining a simplified overview of the server, much of the middleware setup is handled in server-config.js, including the validation of refresh and access tokens.

The backend used by TheWorldMapper is actually two servers: Apollo Server, which is a GraphQL server, and an ExpressJS server. We do this so that we can combine the mature ecosystem of middleware written for Express with the simplicity of a GraphQL server. Much of the middleware we use is applied to the Express server, and we use Apollo\'s official Express integration to treat the Express server as middleware for the Apollo Server. GraphQL queries and mutations define the types of requests we can make to the Apollo Server, and resolvers(which are ordinary javascript functions) define how to satisfy those requests.

The application platform utilizes a JSON Web Token(JWT) based system for authentication. Tokens.js handles the generation of access and refresh tokens, which are stored cookies that the server is able to parse. Upon each request to the server, a middleware function(defined in server-config.js) looks for both the access and refresh tokens. Depending on the server request, invalid or missing tokens imply specific situations:

- A valid access token means the user is logged in.
- An invalid/missing access token with a valid refresh token means the user has logged in to the service in the past 7 days.

Invalid/missing access and refresh tokens could also mean the user has never logged in; depending on the circumstance, the server middleware will either generate missing tokens or refuse the request.

##### Models

The model files define the schema used for the database. TheWorldMapper uses MongoDB along with Mongoose as an Object Document Mapper(ODM).

##### TypeDefs

The typedef files are where all GraphQL types, queries, and mutations used by the backend are defined. Queries and mutations describe requests and operations for a data source, which, in our case, is a MongoDB database. Queries and mutations also require matching functions that fulfill requests. You can think of GraphQL as an abstract description of a request: get me a todolist, update this todolist, etc., which is then implemented by a function. Using GraphQL as an abstraction layer, we could swap out the implementation of any given request without having to touch any other part of our service. Apollo refers to these functions as resolvers.

##### Resolvers

The resolvers files are where substantive changes to data occurs. Resolver functions are passed arguments specified by queries and mutations, and interact with the database to create, retrieve, update, and delete data.

### General Flow of Backend Requests

A line like this often appears in the client code:

`const { loading, error, data } = useQuery(...);`

When a query/mutation is made, different states are returned depending on the execution phase. Loading and error are fairly straightforward, and data contains a return object bearing the name of a query or mutation. As an example, a query called `getUser` would return some data and be accessed via `data.getUser`.

In the average case, a query or mutation will originate from the frontend and be passed to the backend server url(or uri, as it is defined by Apollo Client). Every request sends along cookies which may or may not contain access or refresh tokens. The request is validated and passed through any remaining middleware functions.

The Apollo server will receive the query/mutation as part of the request, verify that it perfectly matches its corresponding typedef, and then will search the resolver map for a resolver matching the name of the query/mutation. Once the resolver is found, it\'s executed and any return type defined by the query/mutation is sent back to the originating request in the data object.

### Frontend

##### Index and App

Index.js serves as the entry/start point for the frontend and defines the root node for React. Index primarily configures the Apollo Client and sets it as a Provider for the React tree of nodes. Providers and Contexts are part of the React API; a brief explanation of a Context is that exposes data and functions defined in the Provider to all child nodes of the React component that receives the Provider as a prop. Since the Apollo Client is a Provider that is passed to the root component App.js, every component in the React application has access to the Apollo Client.

Most of the client configuration is straightforward; we set a uri, `uri: SERVER_LOCAL_DOMAIN`, which points to our backend server. We tell the client to include authentication related cookies with `credentials: 'include'`. We also initialize the cache, which is defined beforehand. Apollo Client serializes queries and mutations in the form of TYPNAME:ID, where TYPENAME is taken from the `__typename` field defined in a GraphQL type, and ID is taken from an object\' `_id` field, which is of an ObjectID type. This step is done on the line:

`` dataIdFromObject: object => `${object.__typename}:${object._id}` ``.

##### Cache

The Cache folder holds the frontend\'s GraphQL related code. These queries and mutations essentially act as wrappers around those defined for the backend; they exist to allow the frontend to pass arguments to some of the queries and mutations defined in the typedefs folder.

##### Components

The Components folder holds React components. A full explanation of the React library is beyond the scope of the document, and would be a poorer explanation than that provided by the official documentation.

##### Utils

The utils folder is a bit subjective; it is intended to hold javascript code that does not explicitly deal with React or Apollo Client. For TheWorldMapper, the undo/redo system is defined in utils.

#

#### CSS

All CSS files should go in this folder. To editorialize a bit: separating css layout and style attributes into separate css files makes tweaking either easy without unintentionally breaking something, at the cost of potentially defining a selector in two places.

# More on the Backend

### Models and Typedefs

Think of models as a blueprint for the data you want to be saved within your database while typedefs in GraphQL are the blueprint for your entire API. It's similar to using type checking for in a compiled languages in a sense that it helps you catch your mistakes earlier on. However with GraphQL you have to explicitly state resolver definitions, parameter types and

### Separation of Concerns

In the models directory you should be setting up the database using mongoose as the ORM of choice and splitting the code up by data object. For example, in the models directory you should create a model for a User object as User.js and a resource model in a separate file e.g. Wireframe.js, Todolist.js, etc. It is not a good practice to keep resources as the user and instead you should have a reference to the User's id instead within the resource.

```javascript
const { model, Schema, ObjectId } = require("mongoose");

const regionSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    capital: {
      type: String,
      required: true,
    },
    leader: {
      type: String,
      required: true,
    },
    parentRegion: String,
    subregions: [String],
    landmarks: [String],
  },
  { timestamps: true }
);

const Region = model("Region", regionSchema);
module.exports = Region;
```

An important thing to note is that when you are designing the GraphQL typedefs you must keep your models and typedefs in sync otherwise you'll eventually run into an error. Similar to creating database models, you should separate your typedefs based on the database models and the associated functions/resolvers you would use with them.

```javascript
const { gql } = require("apollo-server");

const typeDefs = gql`
  type Region {
    _id: String!
    owner: String
    name: String!
    capital: String!
    leader: String!
    parentRegion: String
    subregions: [String]
    landmarks: [String]
  }
  type RegionWRegionObj {
    _id: String!
    owner: String
    name: String!
    capital: String!
    leader: String!
    parentRegion: String
    subregions: [Region]
    landmarks: [String]
  }
  extend type Query {
    getAllMaps: [Region]
    getRegionById(_id: String!): Region
    getAllChildren(subregionIds: [String]): [Region]

    getAllRegionAbove(_id: String!): [Region]
    getAllLandmarks(_id: String!): [String]

    getAncestorRegions(_id: String!): [AncestorRegion]
  }
  extend type Mutation {
    addMap(map: RegionInput!): String
    deleteMap(_id: String!): Boolean
    updateMapName(_id: String!, value: String!): String

    addRegion(region: RegionInput!): Region
    deleteRegion(_id: String!, childID: String!): Region
    updateRegionField(_id: String!, field: String!, value: String!): Boolean

    updateSubregionArray(_id: String!, subregionsArr: [String]): Region
    updateRegionLandmarks(
      _id: String!
      landmark: String!
      opcode: String!
      newLandmark: String!
    ): Boolean
    updateRegionParent(_id: String!, parentId: String!): Boolean
  }

  input RegionInput {
    _id: String
    owner: String
    name: String
    capital: String
    leader: String
    parentRegion: String
    subregions: [String]
    landmarks: [String]
  }

  type AncestorRegion {
    _id: String!
    name: String!
  }
`;

module.exports = { typeDefs: typeDefs };
```

```bash
|--models
|   |-- user-model.js
|   |-- region-model.js
|   |-- map-model.js
|--typedefs
|   |-- user-def.js
|   |-- mao-def.js
|   |-- root-def.js #Merge the files here
|--resolvers
|   |-- map-resolvers.js
|   |-- user-resolvers.js
|   |-- root-resolvers.js #Merge the files here
```

### Resolvers are Controllers

Resolvers are essentially controllers (the C in MVC) which will interact with the database and either query or mutate the database based on the type of resolver being used. The anatomy of a resolver is as such:

```javascript
module.exports = {
  Query: {
    hello: (_, args, context) => {
      const { name } = args;
      return `Hello ${name}!`;
    },
  },
  Mutation: {},
};
```

In an unmentioned typedef we defined a hello resolver that take in an argument called name but we could've destructured it in the header like so

```javascript
Query: {
  hello: (_, { name }, context) => {
    return `Hello ${name}!`;
  };
}
```

[Context](https://www.apollographql.com/docs/apollo-server/data/resolvers/#the-context-argument) is an object "An object (or a function that creates an object) that's passed to every resolver that executes for a particular operation. This enables resolvers to share helpful context, such as a database connection." (Straight from the apollo documentation) A common practice is to pass in the the Express Request and Response objects to the context so that every resolver has extended HTTP request and response functionality if needed.

```javascript
// index.js
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ req, res }) => ({ req, res }),
});

//some resolver path
Query: {
  hello: (_, { name }, { req, res }) => {
    const { headers } = req;
    res.status(200); //An OK response
    return `Hello ${name}!`;
  };
}
```

## Relevant Links

https://mongoosejs.com/docs/guide.html

https://reactjs.org/docs/getting-started.html

https://www.apollographql.com/docs/react/

https://www.apollographql.com/docs/apollo-server/

https://jwt.io/introduction/

https://graphql.org/learn/

http://expressjs.com/
