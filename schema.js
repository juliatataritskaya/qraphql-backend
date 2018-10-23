let makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

let id = 5;
let tutorialId = 4;

let typeDefs = `
type blogpost {
    id: String!
    title: String!
    thumbnail: String
    content: String
}

type tutorial {
    id: String!
    name: String
    url: String
}

input blogpostInput {
    title: String!
    thumbnail: String
    content: String
}

input tutorialInput {
    name: String
    url: String
}

type Query {
    blogposts(limit: Int): [blogpost]
    tutorials(limit: Int): [tutorial]
    blogpost(id: String!): blogpost
}

type Mutation {
    addBlogpost(post: blogpostInput!): blogpost
    addTutorial(tutorial: tutorialInput!): tutorial
    deleteTutorial(id: Int): Boolean
    updateTutorial(id: Int, tutorial: tutorialInput!): tutorial
}
`;

let getAllBlogposts = (obj, args, context, info) => {
  const limitInput = args.limit;
  const limit = parseInt(limitInput);
  let newArray = [];
  if(limit){
    for (let i = 0; i < limit; i++) {
      newArray.push(listPosts[i]);
    }
  } else {
    newArray = listPosts;
  }
  return newArray;
};

let getAllTutorials = (obj, args, context, info) => {
  let newArray = [];
  if(args.limit){
    for (let i = 0; i < parseInt(args.limit); i++) {
      newArray.push(listTutorials[i]);
    }
  } else {
    newArray = listTutorials;
  }
  return newArray;
};


let getBlogpost = (obj, args, context, info) => {
  return {
    id: args.id,
    title: 'Blogpost no. ' + args.id,
    content: 'Some boring content...',
    thumbnail: 'some URL'
  };
};

let addBlogpost = (obj, args, context, info) => {
  args.post["id"] = ++id;
  listPosts.push(args.post);
  return args.post;
};


let addTutorial = (obj, args, context, info) => {
  args.tutorial["id"] = ++tutorialId;
  listTutorials.push(args.tutorial);
  return args.tutorial;
};

let updateTutorial = (obj, args, context, info) => {
  let data = args.tutorial;
  data.id = args.id;
  let findedIndex;
  listTutorials.forEach((elem, i)=> {
    if(elem.id == args.id) {
    listTutorials.splice(i, 1, data);
    findedIndex = i;
  }
  })
  return listTutorials[findedIndex];
};

let deleteTutorial = (obj, args, context, info) => {
  listTutorials.forEach((elem, i)=> {
    if(elem.id == args.id){
    listTutorials.splice(i, 1);
  }});
  return true;
};

let resolvers = {
  Query: {
    blogposts: getAllBlogposts,
    tutorials: getAllTutorials,
    blogpost: getBlogpost
  },
  Mutation: {
    addBlogpost: addBlogpost,
    addTutorial: addTutorial,
    deleteTutorial: deleteTutorial,
    updateTutorial: updateTutorial
  }
};

module.exports = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});


let listPosts = [
  { id: 1,
    title: 'Blogpost no. 1',
    content: 'Some boring content...1',
    thumbnail: 'some URL 1'
  }, { id: 2,
    title: 'Blogpost no. 2',
    content: 'Some boring content...2',
    thumbnail: 'some URL 2'
  }, { id: 3,
    title: 'Blogpost no. 3',
    content: 'Some boring content...3',
    thumbnail: 'some URL 3'
  }, { id: 4,
    title: 'Blogpost no. 4',
    content: 'Some boring content...4',
    thumbnail: 'some URL 4'
  }, { id: 5,
    title: 'Blogpost no. 5',
    content: 'Some boring content...5',
    thumbnail: 'some URL 5'
  }
];

let listTutorials = [
  { id: 1,
    name: 'Tutorial no. 1',
    url: 'Some boring content...1'
  }, { id: 2,
    name: 'Tutorial no. 2',
    url: 'Some boring content...2'
  }, { id: 3,
    name: 'Tutorial no. 3',
    url: 'Some boring content...3'
  }, { id: 4,
    name: 'Tutorial no. 4',
    url: 'Some boring content...4'
  }
];
