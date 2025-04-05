import express from 'express';
import authRoutes from './routes/auth.routes';
import flightRoutes from './routes/flight.routes';
import clientRoutes from './routes/client.routes';
import employeeRoutes from './routes/employee.routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/client', clientRoutes);
app.use('/flight', flightRoutes);
app.use('/employee', employeeRoutes);


app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`);
});

export default app;