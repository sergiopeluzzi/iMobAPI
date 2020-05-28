'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImagemSchema extends Schema {
  up () {
    this.create('imagems', (table) => {
      table.increments()
      table
        .integer('imovel_id')
        .unsigned()
        .references('id')
        .inTable('imovels')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')    
      table.string('caminho').notNullable
      table.timestamps()
    })
  }

  down () {
    this.drop('imagems')
  }
}

module.exports = ImagemSchema
