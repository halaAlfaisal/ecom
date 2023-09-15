import { AddToCart } from "./AddToCart";


export default function Items({ item } : {item: Item}) {
  return (
    <main className="flex justify-between items-center p-4 border-b">
      <div className="w-[150px] h-[150px]">
        <img
          className="w-[150px] h-[150px] object-cover rounded-[30px]"
          src={item.imgSrc}
          alt={item.name}
        />
      </div>
      <div className="flex-2 px-8">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-lg">Price: {item.price} KD</p>
        <p>{item.description}</p>
      </div>
      <AddToCart item={item} />
    </main>
  );
}