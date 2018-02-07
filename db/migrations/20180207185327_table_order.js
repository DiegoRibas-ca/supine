
exports.up = function (knex, Promise) {
    return knex.schema.createTable('table_order', (table) => {
        table.increments();
        table.string('user_name');
        table.string('user_phone');

    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('table_order');
};
