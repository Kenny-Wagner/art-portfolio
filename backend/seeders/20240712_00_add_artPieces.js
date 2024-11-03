const testArtPieces = [
  {
    "title": "Beach Buddies",
    "year": 2024,
    "size": "9x12",
    "medium": "Acrylic on Canvas",
    "description": "This is my first experiment with a limited color palette, as well as the first painting in my mini series “Kirby Buddies”. I mostly do these little Kirby paintings for fun and to test out new paints and colors, they are a joy to work on and the finished product is just adorable.",
    "price": 75,
    "sold": false,
    "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/FanArt/Beach_Buddies_Photo.webp",
    "type": "FanArt"
  },
  {
    "title": "BOTW: Moo Moo Milk Still Life",
    "year": 2024,
    "size": "11x17",
    "medium": "Acrylic on Canvas",
    "description": "One of my favorite things about playing Breath of the Wild and Tears of this Kingdom was the immediate feeling of warmth and coziness these two games evoke. I had only just finished TOTK and I’m already developing a sort of recent nostalgia with both games. I tried to elicit those same feelings of warmth and familiarity with this still life, set in a humble little home in the Kingdom of Hyrule.",
    "price": 150,
    "sold" : false,
    "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/FanArt/BOTW__Moo_Moo_Milk_Still_Life.webp",
    "type": "FanArt"
},
{
  "title": "Lesbian Kirby Landscape",
  "year": 2024,
  "size": "14x18",
  "medium": "Acrylic on Canvas",
  "description": "The Lesbian Pride flag has some of the best colors of any flag I've seen! With this painting I wanted to turn the flag into a landscape, the two Kirby lovers were actually a last minute addition. After trying out this more cartoonish style for the ocean and clouds, I felt like I painted a little world that was perfect for a group of Kirbys to inhabit, and even fall in love!",
  "price": 100,
  "sold": false,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/FanArt/Lesbian_Kirby_Landscape.webp",
  "type": "FanArt"
},
{
  "title": "Sus Streamer",
  "year": 2024,
  "size": "5x7",
  "medium": "Alcohol Marker Illustration",
  "description": "As goofy as it was, I really enjoyed the “Sus Guy” Jerma memes of 2020. Fans had managed to further ghoulify a man who was already ghoulish himself from time to time. What was especially interesting is how this meme spread well beyond the bubble of people who were familiar with Jerma, and entered the cultural zeitgeist for a while. With this marker illustration I tried to escalate that sinister feeling of the Original photo while also zooming in on the more iconic aspect, the exaggerated smile.",
  "price": 30,
  "sold": false,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/FanArt/Sus_Streamer.webp",
  "type": "FanArt" 
},
{
  "title": "Avocado Toast 1",
  "year": 2024,
  "size": "9x12",
  "medium": "Acrylic on Canvas",
  "description": "For this painting I took a little bit of inspiration from French impressionist painters such as Monet in the way that I rendered the actual food, using broad brush strokes and unblended colors. This was the first painting in my food series, and I plan on re-using this style of background in my future food paintings.",
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Original/Avocado_Toast_1.webp",
  "type": "Original"
},
{
  "title": "Avocado Toast 2",
  "year": 2024,
  "size": "9x12",
  "medium": "Acrylic on Canvas",
  "description": "This painting is the second in my series of food paintings, and it is a companion piece to “Avocado Toast 1”, meant to be displayed either side-by-side or one above the other. ",
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Original/Avocado_Toast_2.webp",
  "type": "Original" 
},
{
  "title": "Bahamian Portrait",
  "year": 2024,
  "medium": "Pixel Animation",
  "description": "This pixel Animation is a commissioned portrait that can be used on discord and other platforms. This project was very fun to draw up and animate, especially with the relaxed beach theme.",
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Animation/Bahamian_Portrait.webp",
  "type": "Animation"
},
{
  "title": "Eye Enemy Concept",
  "year": 2021,
  "medium": "Pixel Animation",
  "description": "This pixel Animation is a mock-up/test of concept for a platformer/puzzle game about human organs avoiding and fending off different infectious diseases and parasites.",
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/Animation/Eye_Enemy_Concept.webp",
  "type": "Animation"
},

{
  "title": "Snow Buddies",
  "year": 2024,
  "size": "9x12",
  "medium": "Acrylic on Canvas",
  "description": "This is my second installment in the mini “Kirby Buddies” series, with the first being “Beach Buddies”. I essentially took everything I loved about my first painting, changed the season, and added an extra buddy! These paintings are very fun for me to work on, and I plan on adding more very soon.",
  "price": 75,
  "sold": false,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/FanArt/Snow_Buddies.webp",
  "type": "FanArt"
},

{
  "title": "Love Vaporeon",
  "year": 2024,
  "size": "4x4",
  "medium": "Acrylic on Canvas",
  "description": "A cute, sweet little portrait for a sweet little pokemon! While experimenting with limited color palettes, I chose this fan-favorite aquatic pokemon as my muse based off of the use of teals and navy in its design. It’s also just a fun little creature to paint.",
  "price": 25,
  "sold": false,
  "image_url": "https://tibialrose.s3.us-east-2.amazonaws.com/public/FanArt/Love_Vaporeon.webp",
  "type": "FanArt"
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