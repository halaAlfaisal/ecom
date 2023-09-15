interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  imgSrc: string;
}

interface ItemsProps {
  items: Item[];
}