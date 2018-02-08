exports.up = function (knex, Promise) {
    return knex.schema.alterTable('table_order', (table) => {
        table.string('user_phone').alter();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('table_order', (table) => {
        table.integer('user_phone').alter();
    });
};
