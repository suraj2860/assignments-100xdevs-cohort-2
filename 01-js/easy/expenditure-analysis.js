/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const output = transactions.reduce((acc, curr) => {
    const key = curr["category"];
    if(!acc[key]){
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  } , {})

  const result = Object.entries(output).map(([category, transactions]) => {
    const totalSpent = transactions.reduce((total, item) => total + item.price, 0);
    return {category: category, totalSpent: totalSpent};
 });

  return result;
}

// console.log(calculateTotalSpentByCategory([{
//   id: 1,
//   timestamp: 1656076800000,
//   price: 10,
//   category: 'Food',
//   itemName: 'Pizza',
// },
// {
//   id: 2,
//   timestamp: 1656076800000,
//   price: 10,
//   category: 'Food',
//   itemName: 'Pizza',
// },
// {
//   id: 3,
//   timestamp: 1656076800000,
//   price: 10,
//   category: 'Clothing',
//   itemName: 'Pizza',
// },
// {
//   id: 4,
//   timestamp: 1656076800000,
//   price: 10,
//   category: 'Clothing',
//   itemName: 'Pizza',
// }
// ]));

module.exports = calculateTotalSpentByCategory;
