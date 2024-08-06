const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userSchema')
const app = express()

const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hellp api')
})

app.post('/user',async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    console.log(error.message)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put('/users/:id', async (req, res) => {
  try {
    const {id} = req.params
    const user = await User.findByIdAndUpdate(id, req.body)

    if (!user) {
      return res.status(404).json({ message: 'user did not found' })
    }

    const updatedUser = await User.findById(id)

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const {id} = req.params

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'user did not found' })
    }
    
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/api', (req, res) => {
  console.log(req.body)
  res.status(200).json({ result: req.body.text });
})

mongoose
  .connect('mongodb+srv://Admin:9KG6yjhXgrFIjsgq@cluster0.qmeypi6.mongodb.net/crm-api?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to Mongodb')

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })