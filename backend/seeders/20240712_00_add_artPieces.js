const testArtPieces = [
  {
      "title": "Jackie",
      "description": "Jackie on the bed",
      "price": 1000,
      "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/images/jackie.jpg",
      "type": "animation"
  },
  {
      "title": "Kennedy",
      "description": "Kennedy sleeping on the bed",
      "price": 3000,
      "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/images/kennedy1.jpg",
      "type": "fanart"
  },
  {
      "title": "Kennedy(Goon)",
      "description": "Kennedy being a goon",
      "price": 4000,
      "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/images/kennedygoon.jpg",
      "type": "animation"
  },
  {
      "title": "Jackie with Kirby",
      "description": "Jackie sleeping with kirby",
      "price": 2000,
      "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/images/jackkirb.png"
  },
  {
    "title": "Catimation",
    "description": "Cat animation",
    "price": 300,
    "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/images/cat.webp",
    "type": "animation"
},
];

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('artpieces', testArtPieces);
    },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('artpieces', null, {});
    },
  };