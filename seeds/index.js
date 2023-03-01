const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '63e5224516f69aca692ff7af',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempora harum eos illo eius, et veritatis provident deserunt ex error nihil! Quae, similique ipsum iste totam vitae temporibus earum minima!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dd60somaj/image/upload/v1677269967/YelpCamp/vyfcigvqgj7gohqccfqx.avif',
          filename: 'YelpCamp/vyfcigvqgj7gohqccfqx',
        },
        {
          url: 'https://res.cloudinary.com/dd60somaj/image/upload/v1677269967/YelpCamp/isj9ri9d86u3wqbr9ju6.avif',
          filename: 'YelpCamp/isj9ri9d86u3wqbr9ju6',
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});