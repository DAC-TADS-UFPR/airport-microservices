const express = require("express");
const router = express.Router();
const axios = require("axios");
const services = require("../config/services");

router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${services.auth}/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Erro ao autenticar" });
  }
});

module.exports = router;
