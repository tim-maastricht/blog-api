// const mongoose = require("mongoose");
const { PostModel } = require("../../models/PostModel");
const { UserModel } = require("../../models/UserModel");
const { dbConnect, dbDisconnect } = require("../dbConnManager");

async function dbSeed() {

  // user data
  const usersToSeed = [
    {
      username: "seedUser1",
      password: "bananas1",
      email: "test+seed1@email.com",
      isAdmin: false,
      usersWeFollow: [],
      postsWeReactedTo: []
    },
    {
      username: "seedUser2",
      password: "bananas2",
      email: "test+seed2@email.com",
      isAdmin: true,
      usersWeFollow: [],
      postsWeReactedTo: []
    },
  ]

  // user seeding
  for (const userData of usersToSeed) {
    await UserModel.create(userData);
  }

  // user have passwords, passwords are hashed on pre-save hook (TODO)
  // hooks/ middleware won't fire on inserMany, we must loop through user data
  // and create seed user one by one

  // post data
  let user1 = await UserModel.findOne({username: usersToSeed[0].username})
  let user2 = await UserModel.findOne({username: usersToSeed[1].username})

  const postsToSeed = [
    {
      title: "Seed Post 1",
      content: "Lorem ipsum dolor sit amet consectitur",
      authors: [
        user1._id
      ]
    },
    {
      title: "Seed Post 1",
      content: "Lorem ipsum dolor sit amet consectitur",
      authors: [
        user1._id,
        user2._id
      ]
    },
    
  ]
  // post seeding

  await PostModel.insertMany(postsToSeed);

}

dbConnect().then(async () => {
  console.log("Seed the DB now...");
  await dbSeed();
  console.log("DB has been seeded.");

  await dbDisconnect();
});
