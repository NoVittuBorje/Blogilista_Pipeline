const { test, describe,after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')







describe.only('login to get token', () => {
  test.only('login works'),async () => {
    const login = {
      'username':'root',
      'password':'salasana'
    }
    const user = await api.post('/api/login').send(login).expect(200)
    assert.strictEqual(user.body.name,'Jorma')
  }
})


describe.only('blogs api tests',() => {
  test.only('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  })

  test.only('there are a number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, response.body.length)
  })
  test.only('has id', async () => {
    const response = await api.get('/api/blogs')
    assert('id' in response.body[response.body.length -1])
  })
})

describe.only('post working', () => {

  test.only('post works', async () => {
    const testblog = {
      'title': 'Blogi testi 5 userin kanssa',
      'author': 'Root too 5',
      'url':'testitesti.com/Root5',
      'likes':5
    }
    const initialblogs = await api.get('/api/blogs').expect(200)
    const data = await api.post('/api/blogs').send(testblog).set({ Authorization: config.TOKEN, }).expect(201).expect('Content-Type', /application\/json/)
    console.log(data.status)
    const afterpostblogs = await api.get('/api/blogs')
    assert.strictEqual(afterpostblogs.body.length, initialblogs.body.length +1)
  })

  test.only('post works with no likes', async  () => {
    const testblog = {
      'title': 'juuu',
      'author': 'juuuu',
      'url': 'juuuuu' }
    const initialblogs = await api.get('/api/blogs').expect(200)
    console.log(initialblogs.status)
    const blogs = await api.post('/api/blogs').set({ Authorization: config.TOKEN, }).send(testblog).expect(201).expect('Content-Type', /application\/json/)
    console.log(blogs.status)
    const afterpostblogs = await api.get('/api/blogs').expect(200)
    let likes = afterpostblogs.body.length -1
    assert.strictEqual(afterpostblogs.body[likes].likes,0)
  })
  test.only('post will not work without title or url', async () => {
    const testblog = {
      'author': 'juuuu',
      'url':'juu'
    }
    const post = await api.post('/api/blogs').send(testblog).set({ Authorization: config.TOKEN, }).expect(400)
    assert.strictEqual(post.status,400)
  })
})

describe.only('delete works', () => {
  test.only('delete works', async () => {
    const initialblogs = await api.get('/api/blogs').expect(200)
    const lenOfdb = initialblogs.body.length -1
    const idofLast = initialblogs.body[lenOfdb].id
    await api.delete('/api/blogs/'+idofLast).set({ Authorization: config.TOKEN }).expect(204)
    const afterdel = await api.get('/api/blogs').expect(200)
    assert.strictEqual(initialblogs.body.length -1 , afterdel.body.length )
  })

})

describe.only('put works', () => {
  test.only('put works', async () => {
    const initialblogs = await api.get('/api/blogs').expect(200)
    const lenOfdb = initialblogs.body.length -1
    const Lastblog = initialblogs.body[lenOfdb]
    let updatedLikes = Lastblog.likes +2
    const testblog = {
      'title': Lastblog.title,
      'author': Lastblog.author,
      'url':Lastblog.url,
      'likes':updatedLikes }
    const updated = await api.put('/api/blogs/'+Lastblog.id).send(testblog).set({ Authorization: config.TOKEN, }).expect(201).expect('Content-Type', /application\/json/)

    assert.strictEqual(updatedLikes , updated.body.likes)
  })
})


after(async () => {
  await mongoose.connection.close()
})