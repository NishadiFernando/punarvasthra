const emailRoutes = require('./routes/email');

// Routes
app.use('/api/sarees', sareeRoutes);
app.use('/api/customization-requests', customizationRequestRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api', emailRoutes); 