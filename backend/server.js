const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aakashrajendran2004:aakashrajendran@cluster0.wu1gi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



// Import routes
const patientRoutes = require('./routes/patient');
const appointmentRoutes = require('./routes/appointment');
const doctorRoutes = require('./routes/doctor');
const inventoryRoutes = require('./routes/inventory');
const prescriptionRoutes = require('./routes/prescription');
const medicalTestRoutes = require('./routes/medicalTest');
const reportRoutes = require('./routes/report');
const telemedicineRoutes = require('./routes/telemedicine');
const billingRoutes = require('./routes/billing');
const patientPortalRoutes = require('./routes/patientPortal');

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/medicalTests', medicalTestRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/telemedicine', telemedicineRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/patientPortal', patientPortalRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Medecro API');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
