const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/userSchema')

const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const {
	authRouter,
	// noticesRouter,
	// petsRouter,
	// swaggerRouter,
	// usersRouter,
	// friendsRouter,
	// newsRouter,
} = require('./routes');

const app = express()

const port = 3000
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRouter);

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

module.exports = app;

mongoose
  .connect('mongodb+srv://ksenia:dDavTnWJqRTX8Hy8@cluster0.0w9nk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to Mongodb')

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })