'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imagem extends Model {

    static get computed() {
        return ['url']
    }

    getUrl({ path }) {
        return `${Env.get('APP_URL')}/fotos/${path}`
    }

    imovel() {
        return this.belongsTo('App/Models/Imovel')
    }
}

module.exports = Imagem
