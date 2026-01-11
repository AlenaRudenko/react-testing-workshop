export type TProduct = {
  id: number;
  title: string;
  price: number;
  qty: number;
};

export const basketWithNoQuantity: TProduct[] = [
  { id: 1, title: "Product A", price: 1000, qty: 2 },
  { id: 2, title: "Product B", price: 2000, qty: 0 },
  { id: 3, title: "Product C", price: 1200, qty: 3 },
  { id: 4, title: "Product D", price: 3000, qty: 2 },
  { id: 5, title: "Product E", price: 1400, qty: 0 },
  {
    id: 6,
    title: "Product F",
    price: 1500,
    qty: 2,
  },
  {
    id: 7,
    title: "Product G",
    price: 1000,
    qty: 2,
  },
];

export const filtreredBasketWithQuantityOnly: TProduct[] = [
  { id: 1, title: "Product A", price: 1000, qty: 2 },
  { id: 3, title: "Product C", price: 1200, qty: 3 },
  { id: 4, title: "Product D", price: 3000, qty: 2 },
  {
    id: 6,
    title: "Product F",
    price: 1500,
    qty: 2,
  },
  {
    id: 7,
    title: "Product G",
    price: 1000,
    qty: 2,
  },
];
