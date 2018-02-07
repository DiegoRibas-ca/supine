
exports.up = function (knex, Promise) {
    return knex.schema.createTable('items_order', (table) => {
        table.integer('order_id').unsigned()
        table.foreign('order_id').references('table_order.id')
        table.integer('item_id').unsigned()
        table.foreign('item_id').references('table_items.id')
        table.integer('quantity');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('items_order');
};
