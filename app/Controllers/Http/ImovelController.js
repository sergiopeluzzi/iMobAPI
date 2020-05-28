'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Imovel = use('App/Models/Imovel')

/**
 * Resourceful controller for interacting with imovels
 */
class ImovelController {

  async index ({ request }) {
    const { latitude, longitude } = request.all()

    const imoveis = await Imovel.query().with('fotos').proximidade(latitude, longitude, 10).fetch()
    
    return imoveis
  }

  async store ({ auth, request }) {
    const { id } = auth.user

    const data = request.only([
      'descricao',
      'endereco',
      'valor',
      'latitude',
      'longitude'
    ])

    const imovel = await Imovel.create({ ...data, user_id: id })

    return imovel
  }

  async show ({ params }) {
    const imovel = await Imovel.findOrFail(params.id)

    return imovel
  }

  async update ({ params, request, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    const data = request.only([
      'descricao',
      'endereco',
      'valor',
      'latitude',
      'longitude'
    ])

    imovel.merge(data)
    
    await imovel.save()

    return imovel
  }

  async destroy ({ auth, params, response }) {
    const imovel = await Imovel.findOrFail(params.id)

    if (imovel.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Você não tem autorização!' })
    }

    await imovel.delete()
  }
}

module.exports = ImovelController
