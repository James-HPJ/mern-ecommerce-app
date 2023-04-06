const storedProducts = [
  {
    name: "Flagtail Prochilodus",
    description:
      "Moderately hardy fish, with primary colors of silver, black and red. Omnivorous by nature, requires intermediate experience level from handler.",
    price: 20,
    image:
      "https://www.fishbazaar.sg/wp-content/uploads/2020/12/Flagtail-Prochilodus.jpg",
    category: "livestock",
    stock: 15,
  },
  {
    name: "Denison Barb",
    description:
      "Hardy fish, with primary colors of black, red and white. Omnivorous by nature, requires beginner experience level from handler",
    price: 8,
    image:
      "https://www.fishbazaar.sg/wp-content/uploads/2019/04/Denison-Barb.jpg",
    category: "livestock",
    stock: 15,
  },
  {
    name: "Figure Eight Puffer",
    description:
      "Moderately hardy fish, with primary colors of green, black and yellow. Carnivorous by nature, requires intermediate experience level from handler.",
    price: 6,
    image:
      "https://www.fishbazaar.sg/wp-content/uploads/2019/04/Figure-Eight-Puffer.jpg",
    category: "livestock",
    stock: 20,
  },
  {
    name: "Green Scat",
    description:
      "Moderately hardy fish, with primary colors of silver, green and black. Omnivorous by nature, requires advanced experience level from handler.",
    price: 5,
    image:
      "https://www.fishbazaar.sg/wp-content/uploads/2017/07/Green-Scat-Edited.jpg",
    category: "livestock",
    stock: 25,
  },
  {
    name: "Mono Fish",
    description:
      "Moderately hardy fish, with primary colors of silver, white and black. Omnivorous by nature, requires intermediate experience level from handler.",
    price: 4.8,
    image: "https://www.fishbazaar.sg/wp-content/uploads/2019/10/Mono-Fish.jpg",
    category: "livestock",
    stock: 30,
  },
  {
    name: "Black-Banded Leporinus",
    description:
      "Hardy fish, with primary colors of gold, yellow and black stripes. Omnivorous by nature, requires intermediate experience level from handler.",
    price: 25,
    image:
      "https://www.fishbazaar.sg/wp-content/uploads/2022/03/Black-Banded-Leporinus.jpg",
    category: "livestock",
    stock: 15,
  },
  {
    name: "ANS OptiClear Glass Tank",
    description: "20x20x20cm / 5mm",
    price: 25,
    image:
      "https://cdn.shopify.com/s/files/1/1685/8749/products/Screenshot2020-05-10at8.04.38PM_1024x.png?v=1589112319",
    category: "tank",
    stock: 20,
  },
  {
    name: "EDENS GARDEN Sky Box",
    description: "Elevated Botom Tank with Cover, 16x16x26cm / 5mm",
    price: 55,
    image:
      "https://cdn.shopify.com/s/files/1/1685/8749/products/dooa-neo-glass-air-20-x-20-x-20-cm_1024x.jpg?v=1589113455",
    category: "tank",
    stock: 20,
  },
  {
    name: "ADA Cube Garden",
    description: "Mini M / 36x22x26cm",
    price: 155,
    image:
      "https://cdn.shopify.com/s/files/1/1685/8749/products/Screenshot2020-05-10at8.55.13PM_1024x.png?v=1589115327",
    category: "tank",
    stock: 20,
  },
  {
    name: "FLUVAL HAGEN Desktop Aquarium",
    description: "34L / Black",
    price: 230,
    image:
      "https://cdn.shopify.com/s/files/1/1685/8749/products/15004_1024x.jpg?v=1487263515",
    category: "tank",
    stock: 20,
  },
  {
    name: "OASE BiOrb AIR 60",
    description: "Coir compost, capillary mat / 6 LEDs",
    price: 786,
    image:
      "https://cdn.shopify.com/s/files/1/1685/8749/products/51k_LxRMD3L_ff11e24c-a700-428e-918a-c133ea362bbe_1024x.jpg?v=1504605403",
    category: "tank",
    stock: 20,
  },
  {
    name: "FLUVAL HAGEN Desktop Aquarium",
    description: "Spec3 / 10L /White",
    price: 163,
    image:
      "https://cdn.shopify.com/s/files/1/1685/8749/products/Screenshot2021-06-02at8.49.53PM_1024x.png?v=1622638415",
    category: "tank",
    stock: 20,
  },
  {
    name: "OASE BioPlus",
    description:
      "Practical internal filters for aquariums from 50 to 200 liters in size",
    price: 55,
    image:
      "https://fishyhub.imgix.net/prod/inventory-images/products/prod_1668569741454.jpg?auto=format%2Ccompress&fit=max&w=1000&dpr=1&q=75",
    category: "filter",
    stock: 20,
  },
  {
    name: "GEX - Corner Power Filter",
    description:
      "Corner installation type, runs quiet and compact figure makes the tank look neat",
    price: 19.9,
    image:
      "https://fishyhub.imgix.net/prod/inventory-images/products/prod_1654486410875.jpeg?auto=format%2Ccompress&fit=max&w=1000&dpr=1&q=75",
    category: "filter",
    stock: 20,
  },
  {
    name: "SUNSUN JUP-22/23 Internal Filter (UV filter)",
    description: "multi-functional UV sterilization filter pump",
    price: 56,
    image:
      "https://fishyhub.imgix.net/prod/inventory-images/products/prod_1678779258523.jpg?auto=format%2Ccompress&fit=max&w=1000&dpr=1&q=75",
    category: "filter",
    stock: 20,
  },
  {
    name: "[OF Ocean Free] Hydra Internal Filter",
    description:
      "OF® Hydra Aquatic Depurator, powered by Qian Hu’s patented Hydro-Pure Technology, produces Hydroxyl radicals (•OH)",
    price: 88.9,
    image:
      "https://fishyhub.imgix.net/prod/inventory-images/products/prod_1629360259572.jpg?auto=format%2Ccompress&fit=max&w=1000&dpr=1&q=75",
    category: "filter",
    stock: 20,
  },
  {
    name: "AQUAEL - Turbo Filter 500",
    description:
      "The quiet and energy-efficient filter provides double (mechanical and biological) filtration out of the box",
    price: 46.9,
    image:
      "https://fishyhub.imgix.net/prod/inventory-images/products/prod_1654428020909.jpeg?auto=format%2Ccompress&fit=max&w=1000&dpr=1&q=75",
    category: "filter",
    stock: 20,
  },
  {
    name: "EHEIM PICKUP 200 INTERNAL FILTER",
    description:
      "EHEIM Pickup is a compact internal filter made for small aquarium",
    price: 122.5,
    image:
      "https://fishyhub.imgix.net/prod/inventory-images/products/prod_1646326984165.jpg?auto=format%2Ccompress&fit=max&w=1000&dpr=1&q=75",
    category: "filter",
    stock: 20,
  },
];

module.exports = storedProducts;
