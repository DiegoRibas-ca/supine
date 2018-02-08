
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries\
  let restaurants;
  let  items;
  let order;
  return knex('items_order').del()
    .then(() => knex('table_order').del())
    .then(() => knex('table_items').del())
    .then(() => knex('restaurant').del())
    .then(function () {
      console.log("Creating Restaurants");
      return Promise.all([
        // Inserts seed entries
        knex('restaurant').insert({name_rest: 'Mezzanine', location: 'Toronto', phone_rest: '16472296260' }).returning('id'),
        knex('restaurant').insert({ name_rest: 'Simons', location: 'Toronto', phone_rest: '16472296260' }).returning('id'),
        knex('restaurant').insert({ name_rest: 'Diegos', location: 'Toronto', phone_rest: '16472296260' }).returning('id'),
        knex('restaurant').insert({name_rest: 'Yves', location: 'Toronto', phone_rest: '16472296260' }).returning('id'),
      ]);
    })
    .then(data => {
      // console.log(data)
      // console.log('Creating the Table Items')
      restaurants = data
      return Promise.all([
        knex('table_items').insert({ item: 'Hamburguer', description: 'Double cheese and patties', price: 12, restaurant_id: data[0][0] }).returning('id'),
        knex('table_items').insert({ item: 'Sushi', description: '6 piece spicy salmon', price: 11, restaurant_id: data[0][0]  }).returning('id'),
        knex('table_items').insert({ item: 'Coke', description: '600 ml', price: 2, restaurant_id: data[0][0]  }).returning('id'),
        knex('table_items').insert({ item: 'Orange Juice', description: '500 ml', price: 3, restaurant_id: data[0][0]  }).returning('id'),
      ])
    })
    .then(data => {
      console.log('order table')
      items = data;
      return Promise.all([
        knex('table_order').insert({ user_name: 'Diego', user_phone: '16472296260' }).returning('id'),
        knex('table_order').insert({ user_name: 'Simon', user_phone: '16472296260' }).returning('id'),
        knex('table_order').insert({ user_name: 'Yve', user_phone: '16472296260' }).returning('id'),
      ])
    })
    .then(data => {
      console.log(items)
      order = data;
      return Promise.all([
        knex('items_order').insert({order_id: order[0][0], item_id: items[0][0], quantity: 3 }),
        knex('items_order').insert({ order_id: order[1][0], item_id: items[1][0], quantity: 2 }),
        knex('items_order').insert({ order_id: order[2][0], item_id: items[2][0], quantity: 5 })
      ])
    })
};
