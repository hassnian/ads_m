const  makeGetAllAds = require ('./get-ads')
const  makeFakeAd = require ('../../__test__/fixtures/ad')
describe('get ad controller', () => {
    it('successfully gets ads', async () => {
        const getAllAds = makeGetAllAds({ listAllAds: c => c })
        const request = {
          headers: {
            'Content-Type': 'application/json'
          },
          body: undefined
        }
        const expected = {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          body: undefined
        }
        const actual = await getAllAds(request)
        expect(actual).toEqual(expected)
    })
})