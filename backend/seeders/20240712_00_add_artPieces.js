const testArtPieces = [
  {
      "title": "Beach Buddies Photo",
      "year": 2024,
      "size": "11x17",
      "medium": "Acrylic on canvas",
      "description": "Buddies on the beach Buddies on the beach Buddies on the beach Buddies on the beach Buddies on the beach Buddies on the beach",
      "price": 250,
      "sold" : true,
      "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Fan+Art/Beach_Buddies_Photo.webp",
      "type": "fanart"
  },
  {
    "title": "BOTW: Moo Moo Milk Still Life",
    "year": 2024,
    "size": "11x17",
    "medium": "Acrylic on canvas",
    "description": "BOTW: Moo Moo Milk BOTW: Moo Moo Milk  BOTW: Moo Moo Milk  BOTW: Moo Moo Milk  BOTW: Moo Moo Milk  BOTW: Moo Moo Milk ",
    "sold" : false,
    "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Fan+Art/BOTW__Moo_Moo_Milk_Still_Life.webp",
    "type": "fanart"
},
{
  "title": "Lesbian Kirby Landscape",
  "year": 2024,
  "size": "11x17",
  "medium": "Acrylic on canvas",
  "description": "Lesbian Kirby Landscape Lesbian Kirby Landscape Lesbian Kirby Landscape Lesbian Kirby Landscape Lesbian Kirby Landscape Lesbian Kirby Landscape ",
  "sold" : false,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Fan+Art/Lesbian_Kirby_Landscape.webp",
  "type": "fanart"
},
{
  "title": "Sus Streamer",
  "year": 2024,
  "size": "11x17",
  "medium": "Acrylic on canvas",
  "description": "Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer Sus Streamer ",
  "sold" : true,
  "price": 150,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Fan+Art/Sus_Streamer.webp",
  "type": "fanart" 
},
{
  "title": "Avocado Toast 1",
  "year": 2024,
  "size": "11x17",
  "medium": "Acrylic on canvas",
  "description": "Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 Avocado Toast 1 ",
  "sold" : false,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Originals/Avocado_Toast_1.webp",
  "type": "original"
},
{
  "title": "Avocado Toast 2",
  "year": 2024,
  "size": "11x17",
  "medium": "Acrylic on canvas",
  "description": "Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 Avocado Toast 2 ",
  "sold" : true,
  "price": 150,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Originals/Avocado_Toast_2.webp",
  "type": "original" 
},
{
  "title": "Bahamian Portrait",
  "year": 2024,
  "description": "Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait Bahamian Portrait ",
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Animation/Bahamian_Portrait.webp",
  "type": "animation"
},
{
  "title": "Eye Enemy Concept",
  "year": 2024,
  "description": "Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept Eye Enemy Concept ",
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Animation/Eye_Enemy_Concept.webp",
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