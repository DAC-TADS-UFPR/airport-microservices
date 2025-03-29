const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const proxyRoutes = require("./routes/proxyRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(proxyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway rodando na porta ${PORT}`));
