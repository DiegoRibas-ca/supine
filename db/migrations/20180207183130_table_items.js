
exports.up = function (knex, Promise) {
    return knex.schema.createTable('table_items', (table) => {
        table.increments();
        table.string('item');
        table.string('description');
        table.integer('price');
        table.integer('restaurant_id').unsigned()
        table.foreign('restaurant_id').references('restaurant.id')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('table_items');
};

