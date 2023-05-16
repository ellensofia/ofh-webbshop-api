export interface Product {
  id: string;
  image: string;
  title: string;
  brand?: string;
  description: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/* http://127.0.0.1:5173 */

export const products: Product[] = [
  {
    image: "/assets/new-works-tea-shelf.png",
    brand: "New Works",
    title: "Tea Shelf",
    description:
      "The New Works Tea Shelf can be used anywhere in the home for storage and display of small items. The shelves are neatly assembled with flat knurled screws in stainless steel, adding an honest yet refined detail to the design. ",
    price: 2299,
    id: "e1",
  },
  {
    image: "/assets/ch24-chair-beech-clay.png",
    brand: "Carl Hansen & Søn",
    title: "CH24 Wishbone Chair",
    description:
      "To celebrate more than 70 years of collaboration between Carl Hansen & Søn and Hans J. Wegner, designer Ilse Crawford reinterprets the CH24 Wishbone Chair in a palette of nine soft yet complex colors. This one is in a grey tone called 'Clay'.",
    price: 6065,
    id: "d2",
  },
  {
    image: "/assets/cestita-alubat.png",
    brand: "Santa & Cole",
    title: "Cestita Alubat Table Lamp",
    description:
      "Cestita Alubat is the latest addition to the Cesta lamp family, designed by Miguel Milá. Robust yet lightweight, this version is ready for action indoors and out. Its aluminium structure, with a closed plastic balloon for better sealing and a rechargeable battery, is distinguished by its sobriety.",
    price: 7835,
    id: "c1",
  },
  {
    image: "/assets/new-works-coffee-table.png",
    brand: "New Works",
    title: "Florence Coffee Table",
    description:
      "The Florence Coffee Table is a stylish coffee table, designed by New Works Studio and is part of the Florence collection. The table top measures 90 cm in diameter, where its round shape together with the angular base creates an appealing aesthetic.",
    price: 11995,
    id: "f4",
  },
  {
    image: "/assets/new-works-dining-table.png",
    brand: "New Works",
    title: "Florence Dining Table",
    description:
      "The Florence Dining Table demonstrates visual lightness and beautiful simplicity. A lightness that allows the table to un-obstruct life's objects, whether in-use or on display. Its sleek frame and timeless table top allows you to focus on the contents of living.",
    price: 16995,
    id: "e6",
  },
  {
    image: "/assets/new-works-kizu-lamp.png",
    brand: "New Works",
    title: "Kizu Table Lamp",
    description:
      "Composed of two bold sculptural forms, the Kizu Table Lamp displays a weightless balancing act. The illusion of gravity creates a tension within the piece, while its curved forms initiate a calming effect.",
    price: 4495,
    id: "a5",
  },
  {
    image: "/assets/alessi-set-of-spoons.png",
    brand: "Alessi",
    title: "Set of Spoons Il caffè/tè",
    description:
      "Alessi's Il caffè/tè is an exceptional set of 8 spoons. Each piece is designed by a different, brilliant contemporary artist and together they work as a symbolic selection of modern architecture. The set is an ideal treasure both for design enthusiasts, as well as anyone who desires to include a piece of art in their daily rituals.",
    price: 850,
    id: "b3",
  },
  {
    image: "/assets/menu-scented-candle.png",
    brand: "Menu",
    title: "Scented Candle/En Passant",
    description:
      "En Passant” simply means “in passing.” A moment in time, like a stroll through the garden after spring rain. This purifying, floral scent invites you to stop and take in the scents of hyacinth, jasmine petals and geranium. The fragrance concludes with grounding arboreal notes of wild moss and cedarwood. 235 g.",
    price: 699,
    id: "e4",
  },
  {
    image: "/assets/vase-vako.png",
    brand: "Smaelta",
    title: "Vako Vase",
    description:
      "Vako glass vase is designed by Lotta Petterson for Smaelta and is mouth-blown at Bergdalahyttan in Småland. The name Vako is taken from the beautiful marsh Vakö outside Älmhult. The lines in the glass symbolize the movement of water and ice.",
    price: 1750,
    id: "c7",
  },
];
