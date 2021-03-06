const  makePostAd = require ('./post-ads')
const  makeFakeAd = require ('../../__test__/fixtures/ad')
describe('post ad controller', () => {
    it('successfully posts an  ad', async () => {
        const postAd = makePostAd({ addAd: c => c })
        const ad = makeFakeAd()
        const request = {
          headers: {
            'Content-Type': 'application/json'
          },
          body: ad
        }
        const expected = {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 201,
          body: { posted: request.body }
        }
        const actual = await postAd(request)
        expect(actual).toEqual(expected)
    })
})