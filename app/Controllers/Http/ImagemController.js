'use strict'

const Imovel = use('App/Models/Imovel')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with imovels
 */
class ImagemController {

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.caminho}`))    
  }

  async store ({ request, params }) {
    const imovel = await Imovel.findOrFail(params.id)

    const imagens = request.file('image', {
      types: ['image'],
      size: '5mb'
    })

    await imagens.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }))

    if(!imagens.movedAll()) {
      return imagens.errors()
    }

    await Promise.all(
      imagens
        .movedList()
        .map(foto => imovel.fotos().create({ caminho: foto.fileName }))
    )
  } 
}

module.exports = ImovelController
