const router = require('express').Router();

const {
    getThoughts,
    getSinglethought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtController.js');