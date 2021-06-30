const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require("../middleware/conig");
const User = require('./../models/user');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcomme to the server');
})

app.post('/registre', async (req, res) => {

    try {
        let data = req.body
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

        let user = new User({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password

        })

        let userFormDb = await user.save()
        res.status(201).send({ message: 'user registed succesfuly' })
    }
    catch (error) {
        res.status(400).send({ message: 'sign up failed', error })
    }


})
app.post('/login', async (req, res) => {
    try {
        let data = req.body
        console.log("1",data)
        var userFromdb = await User.findOne({ email: data.email })
        console.log("2",data.email)

        if (!userFromdb) {
            res.status(404).send({ message: "user not found1" })
           
            console.log("3",userFromdb)

        }
        else {
            let compare = bcrypt.compareSync(req.body.password, userFromdb.password)
            console.log(req.body.password)

            if (!compare) {
                res.status(404).send({ message: "user not found2" })
            }
            else {
                let token = jwt.sign({ id: userFromdb.id, role: userFromdb.role }, config.secret)//houwa cle privee mt3 cryptage
                res.status(200).send({ token })

            }
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })

    }


})
app.get('/one/:id', async (req, res) => {
    try {
        let data = req.params.id;

        let user = await User.findOne({ _id: data })

        if (!user) {
            res.status(404).send({ message: "user not found" })
        }
        else {
            res.status(200).send(user)
        }

    }


    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})

app.get('/currentUser/:id', async (req, res) => {
    try {
        let data = req.params.id;
        let user = await User.findOne({ _id: data })
        if (!user) {
            res.status(404).send({ message: "user not found" })
        }
        else {
            res.status(200).send(user)
        }
    }
    catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.get('/all', async (req, res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({ message: 'API failed:', error })
    }
})
app.put('/update_info/:id', async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body    // récuperer body eli jey ml Front
        let updatedUser = await User.findOneAndUpdate({ _id: id }, data) // paramétre theni data
        if (!updatedUser) {
            res.status(404).send({ message: "profile not found" })
        }
        else {
            res.status(200).send({ message: "profile updated" })
        }
    }
    catch (error) {
        res.status(400).send({ message: "API failed", error })
    }
})
app.delete('/remove/:id', async (req, res) => {
    try {
        let data = req.params.id;
        let deletedUser = await User.findOneAndDelete({ _id: data })
        if (!deletedUser) {
            res.status(404).send({ message: "user not found" })
        }
        else {
            res.status(200).send({ message: "user deleted" })
        }

    }
    catch (error) {
        res.status(400).send({ message: "API failed", error })
    }
})



module.exports = app;