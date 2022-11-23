const express = require('express');

const downloadlistController = require('../controller/downloadlist');
const userauthentication = require('../middleware/auth');
const router = express.Router();


router.get('/downloadlist',userauthentication.authenticate, downloadlistController.getDownloadlist)

module.exports=router