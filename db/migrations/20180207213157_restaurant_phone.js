
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('restaurant', (table) => {
        table.string('phone_rest').alter();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('restaurant', (table) => {
        table.integer('phone_rest').alter();
    });
};

