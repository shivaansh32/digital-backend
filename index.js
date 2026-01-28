import express from 'express'
const app = express();
import authroute from './routes/authroutes.js'
import connectDB from './utils /mongo.js';
import cookieParser from 'cookie-parser';
import noteroute from './routes/notesroute.js'
import cors from 'cors'
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your Vite frontend
    credentials: true,
  })
);
connectDB();

app.get('/',(req,res)=>{
  res.send('hello form server');
});
// routing 
app.use('/auth',authroute);
app.use('/note',noteroute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
