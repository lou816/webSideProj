const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '621380e547d7377a4a341483',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}.${cities[random1000].state}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia qui doloribus blanditiis voluptatibus id? Dicta, tempore accusantium, commodi distinctio fugit minima excepturi assumenda quidem deserunt velit rem voluptatum non placeat?',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djuzt4elx/image/upload/v1645452165/YelpCamp/asroy2618fkh9imutbfl.jpg',
                    filename: 'YelpCamp/asroy2618fkh9imutbfl'
                },
                {
                    url: 'https://res.cloudinary.com/djuzt4elx/image/upload/v1645452166/YelpCamp/elnejnz10akur8flxmgr.jpg',
                    filename: 'YelpCamp/elnejnz10akur8flxmgr'
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        console.log('Data Update Completed');
        mongoose.connection.close();
    })