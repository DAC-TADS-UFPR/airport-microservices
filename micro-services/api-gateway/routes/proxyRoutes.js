const express = require("express");
const router = express.Router();
const axios = require("axios");
const services = require("../config/services");
const authenticateToken = require("../middlewares/authMiddleware");

router.use("/api/:service", authenticateToken, async (req, res) => {
  const { service } = req.params;
  if (!services[service]) {
    return res.status(404).json({ error: "Serviço não encontrado" });
  }

  try {
    const response = await axios({
      method: req.method,
      url: `${services[service]}${req.url.replace(`/api/${service}`, "")}`,
      headers: { Authorization: req.header("Authorization") },
      data: req.body,
    });

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: "Erro ao acessar o serviço" });
  }
});

module.exports = router;
