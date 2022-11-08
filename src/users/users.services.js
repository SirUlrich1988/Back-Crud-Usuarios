const usersControllers = require('./users.controllers')

const getAllUsers = (req, res) => {
    usersControllers.showAllUsers()
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({ message: err.message })
      })
  }

  const getUserById = (req, res) => {
    const id = req.params.id
    usersControllers.showUserById(id)
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(404).json({ message: err.message })
      })
  }

  const registerUser = (req, res) => {
    const {firstName, lastName, email, password, birthday } = req.body;
  
      if (
          firstName &&
          lastName &&
          email &&
          password &&
          birthday
      ) {
          usersControllers.createUser({
              firstName, lastName, email, password, birthday })
              .then( data => {
                  res.status(201).json(data)
              })
              .catch(err => {
                  res.status(400).json(err.message)
              })
      } else {
      // -- Error cuando no mandan todos los datos necesarios para crear un usuario -- //
          res.status(400).json({message: 'All fields must be completed', fields: {
              firstName: 'string',
              lastName: 'string',
              email: 'example@example.com',
              password: 'string',
              birthday: 'YYYY/MM/DD'
          }})
      }
  }

  const patchUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, email, password, birthday } = req.body;
  
    usersControllers
      .updateUser(id, { firstName, lastName, email,  password, birthday })
      .then((data) => {
        if (data[0]) {
          res
            .status(200)
            .json({ message: `User with ID: ${id}, edited succesfully!` });
        } else {
          res.status(404).json({ message: "Invalid ID" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message })
      })
  }

  const destroyUser = (req, res) => {
    const id = req.params.id
    usersControllers
      .deleteUser(id)
      .then((data) => {
        if (data) {
          res.status(204).json()
        } else {
          res.status(404).json({ message: "Invalid ID" })
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message })
      })
  }

  module.exports = { getAllUsers, getUserById, registerUser, patchUser, destroyUser }