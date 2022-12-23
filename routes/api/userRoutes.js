const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addthought,
    removeThought,
} = require('../../crontrollers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser)