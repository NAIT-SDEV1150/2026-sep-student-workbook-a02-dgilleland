import { calculateCartTotal } from './cart-calculator.js';
import { formatCurrency, pluralizeItem } from './formatters.js';

const cartItems = [
  { name: 'Notebook', price: 6.5, quantity: 2 },
  { name: 'Pencil', price: 1.25, quantity: 4 },
];

const total = calculateCartTotal(cartItems, 0.1);

console.log(`The cart has ${pluralizeItem(cartItems.length)}.`);
console.log(`Total after discount: ${formatCurrency(total)}`);
