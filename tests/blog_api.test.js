const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

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

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are right amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(2)
})

test('a valid blog can be added ', async () => {

    const resp = await api.get('/api/users')
    const user = resp.body[0]
    user._id = user.id

    const res = await api
    .post('/api/login')
    .send({username: 'tyyppi', password: 'salasana'})
    const token = res.body.token
    const newBlog = {
        author: 'new author',
        title: 'a blog',
        likes: 6,
        url: 'www.blogblog.com',
        userId: user.id
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogtitles = response.body.map(r => r.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(blogtitles).toContain(
        'a blog'
    )
})
describe('no likes is 0', () => {
    test('0 likes', async () =>{
      const newb = {
        author: 'ooo',
        title: 'ööö',
        url: 'pöööö',
      }
      await api.post('/api/blogs')
      .send(newb)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body[2].likes).toBe(0)
    })
  })

afterAll(() => {
    mongoose.connection.close()
})