import dotenv from 'dotenv';
dotenv.config();

const corsConfig = {
  //origin: process.env.FRONTEND_URL,
  origin: "*",
  credentials: true,
};

export default corsConfig;

  