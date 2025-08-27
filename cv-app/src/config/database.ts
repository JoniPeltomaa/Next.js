const mongoose = require('mongoose');

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Yhdistetty MongoDB')
    } catch (error) {
        console.error('Virhe yhdistämisessä MongoDB: ', error);
    }
}