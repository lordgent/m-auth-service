const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors()); 
app.use(express.json());

const userRoutes = require('./src/routes/user-routes');  
app.use('/api/v1', userRoutes); 

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
