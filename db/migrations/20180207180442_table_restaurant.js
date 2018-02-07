
exports.up = function(knex, Promise) {
    return knex.schema.createTable('restaurant', (table) => {
        table.increments();
        table.string('name_rest');
        table.string('location');
        table.integer('phone_rest');
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('restaurant');
};
