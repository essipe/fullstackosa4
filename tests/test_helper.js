const User = require('../models/user')

// ...
const initialBlogs = [
    {
        title: "New Blog",
        author: "Blogger",
        url: "www.blog.com",
        likes: 5,
        id: "5e46efbfc1a6673e588d7940"
    },
    {
        title: "Uusi blogi",
        author: "Blogaaja",
        url: "www.blog.fi",
        likes: 7,
        id: "5e4ae3c6ddee4a20e4a9fc8c"
    }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  //notesInDb,
  usersInDb,
}