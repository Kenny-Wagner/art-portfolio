const testArtPieces = [
  {
      "id": 1,
      "title": "Jackie",
      "description": "Jackie on the bed",
      "price": 1000,
      "image_url": "http://localhost:5000/jackie.jpg"
  },
  {
      "id": 3,
      "title": "Kennedy",
      "description": "Kennedy sleeping on the bed",
      "price": 3000,
      "image_url": "http://localhost:5000/kennedy1.jpg"
  },
  {
      "id": 4,
      "title": "Kennedy(Goon)",
      "description": "Kennedy being a goon",
      "price": 4000,
      "image_url": "http://localhost:5000/kennedygoon.jpg"
  },
  {
      "id": 2,
      "title": "Jackie with Kirby",
      "description": "Jackie sleeping with kirby",
      "price": 2000,
      "image_url": "http://localhost:5000/jackkirb.png"
  }
];

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('artpieces', testArtPieces);
    },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('artpieces', null, {});
    },
  };