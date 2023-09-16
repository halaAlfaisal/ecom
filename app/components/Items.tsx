import Item from "./buildingBlocks/Item";

export default function Items({ items }: ItemsProps) {
  return (
    <main>
      <ul>
        {items && items.length > 0
          ? items.map((item) => (
              <li
                key={item.id}
              >
                <Item item={item} />
              </li>
            ))
          : "Loading..."}
      </ul>
    </main>
  );
}
