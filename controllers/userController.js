const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    //Get all users
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
            };
            return res.json(studentObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then(async (user) =>
        !user
        ? res.status(404).json({ message: 'No user with the ID' })
        : res.json({
            user,
        })
    )
    .catch ((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
    },
    //Create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    //Delete a user and remove thoughts
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'User does not exist'})
        : User.fineOneAndUpdate(
            { user: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        )
    )
    .then((user) =>
    !user
    ? res.status(404).json({
        message: 'User deleted, no thoughts found',
    })
    : res.json({ message: 'User successfully deleted' })
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},
// Add a thought to a user
addThought(req, res) {
    console.log('You are adding a thought');
    console.log(req.body);
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { thoughts: req.body } },
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No user with that ID'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
//Remove thought from a user
removeThought(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { thought: { thought: req.params.thought } } },
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: 'No user with that ID' })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
    },
}
