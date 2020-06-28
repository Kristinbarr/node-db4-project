
exports.up = function(knex) {
    return knex.schema
        .createTable("steps", tbl => {
        tbl.increments();
        tbl.integer("step_number").notNullable();
        tbl.string("description", 512).notNullable();
        tbl
          .integer("recipe_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("recipes")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('steps')
};
