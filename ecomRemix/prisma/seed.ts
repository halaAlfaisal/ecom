import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@admin.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("nimda", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      role: 'admin'
    },
  });

  const items = [
    {
      id: "1",
      name: "Betelgeuse",
      price: 100,
      description: "Red supergiant star; one of the largest stars known.",
      imgSrc:
        "https://i.guim.co.uk/img/media/247cf106df45ccbdf0953f335f4df367516548c5/0_247_4102_2461/master/4102.jpg?width=620&dpr=2&s=none",
    },
    {
      id: "2",
      name: "Sirius",
      price: 150,
      description: "Brightest star in the night sky; part of Canis Major.",
      imgSrc:
        "https://imgix.bustle.com/uploads/image/2023/1/13/ddc08e1c-af37-44b7-8223-976932980f65-1567213718336-heic0516f_625.jpg?w=768&h=598&fit=crop&crop=focalpoint&auto=format%2Ccompress&q=50&dpr=2&fp-x=0.4947&fp-y=0.5223",
    },
    {
      id: "3",
      name: "Polaris",
      price: 200,
      description:
        "Also known as the North Star; guides sailors and explorers.",
      imgSrc:
        "https://www.star-facts.com/wp-content/uploads/2019/09/Polaris.webp",
    },
    {
      id: "4",
      name: "Andromeda Galaxy",
      price: 250,
      description:
        "Nearest spiral galaxy; on a collision course with Milky Way.",
      imgSrc:
        "https://cdn.spacetelescope.org/archives/images/screen/heic1502a.jpg",
    },
    {
      id: "5",
      name: "Black Hole Cygnus X-1",
      price: 300,
      description:
        "First discovered black hole; located in the Cygnus constellation.",
      imgSrc:
        "https://cdn.britannica.com/26/205226-050-B2621B00/Black-hole-M87-centre-evidence-supermassive-black.jpg?w=400&h=300&c=crop",
    },
    {
      id: "6",
      name: "Vega",
      price: 350,
      description: "Blue-white star; fifth brightest in the night sky.",
      imgSrc:
        "https://skyandtelescope.org/wp-content/uploads/Vega-Stephen-Rahn-Wiki-CC-0-S.jpg",
    },
    {
      id: "7",
      name: "Orion Nebula",
      price: 400,
      description: "Stellar nursery; part of the larger Orion constellation.",
      imgSrc:
        "https://cdn.mos.cms.futurecdn.net/sSCc3xnbUC8KiPGUzRy9KJ.jpg",
    },
    {
      id: "8",
      name: "Halley's Comet",
      price: 450,
      description:
        "Well-known comet; returns to Earth's vicinity every 76 years.",
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRAXEnScirOe11upenCfOT8xSj9PK6-0eSBfUCDpbAZFr3pxYklnE7aX8Zz3DQVSV5pZ4&usqp=CAU",
    },
    {
      id: "9",
      name: "Jupiter's Great Red Spot",
      price: 500,
      description: "Massive storm on Jupiter; has existed for centuries.",
      imgSrc:
        "https://assets.newatlas.com/dims4/default/bb821bb/2147483647/strip/true/crop/1000x902+0+0/resize/1000x902!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fjupiter-water-1.jpg",
    },
    {
      id: "10",
      name: "Saturn's Rings",
      price: 550,
      description:
        "Composed of ice and rock; one of the solar system's wonders.",
      imgSrc:
        "https://solarsystem.nasa.gov/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBakk3IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--657eebf7071c87ce562d4ac74a58a8b22f1f1f3d/48_PIA07960.jpg",
    },
  ];

  for (const item of items) {
    await prisma.item.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
