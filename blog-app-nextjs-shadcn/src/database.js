import mongoose from 'mongoose';

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  const connectDb = async () => {

    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
  
  export default connectDb;