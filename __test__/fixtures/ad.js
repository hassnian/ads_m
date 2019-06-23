const faker = require ('faker')
const cuid = require ('cuid')


const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid
})

module.exports=function makeFakeAd (overrides) {
  const ad = {
    createdOn: Date.now(),
    title:faker.lorem.sentence(4), 
    description:faker.lorem.paragraph(1), 
    id : Id.makeId() 
  }
   return {
    ...ad,
    ...overrides
  }
}
