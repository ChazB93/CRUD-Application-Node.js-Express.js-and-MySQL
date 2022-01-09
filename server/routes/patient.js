const express = require('express');
const router =  express.Router();
const patientController = require('../controllers/patientController');

//create, find, update, delete
router.get('/', patientController.view);
router.post('/', patientController.find);

router.get('/addpatient', patientController.form);
router.post('/addpatient', patientController.create);

router.get('/editpatient/:id', patientController.edit);
router.post('/editpatient/:id', patientController.update);

router.get('/:id', patientController.delete);


module.exports = router;     