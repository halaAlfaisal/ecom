import { AddToCart } from "./AddToCart";


export default function Items({ item }: { item: Item }) {
  return (
    <main className="flex flex-row justify-between items-center p-4 border-b">
      <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] min-w-[80px] ">
        <img
          className="w-full h-full object-cover rounded-[20px]"
          src={item.imgSrc}
          alt={item.name}
        />
      </div>
      <div className="flex-1 px-2 sm:px-8">
        <h2 className="text-lg sm:text-xl font-semibold">{item.name}</h2>
        <p className="text-sm sm:text-lg">Price: {item.price} KD</p>
        <p className="text-sm sm:text-base">{item.description}</p>
      </div>
      <div className="mt-4 sm:mt-0">
        <AddToCart item={item} />
      </div>
    </main>
  );
}
