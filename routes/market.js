const express = require("express");
// const express = require('express');

const router = express.Router();
require('dotenv').config();


// const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const {fetchCharts}=require("../controllers/fetchCharts.js")
const {fetchChartData}=require("../controllers/fetchCharts.js")
const { fetchNiftySensex } = require('../controllers/niftySensexController');
const { fetchCompaniesData } = require('../controllers/companiesData.js');

// router.get("/overview", isSignedIn, getOverview);

router.get('/niftysensex', fetchNiftySensex);

router.get('/companiesData', fetchCompaniesData);

//requestforchartdata
router.get('/chartData', fetchCharts);

module.exports = router;
