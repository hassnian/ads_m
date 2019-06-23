module.exports= function buildMakeAd({ Id }) {
  return function makeAd({ 
    title, 
    description, 
    id = Id.makeId() ,
    createdOn= Date.now()
} = {}) {
  
    if (!title) {
      throw new Error("Ad must have a title");
    }
    if (!description) {
      throw new Error("Ad must have description");
    }
    if (title.length > 50) {
      throw new Error("Title cannot be bigger than 50");
    }
    if (title === description) {
      throw new Error("Title and description cannot be the same");
    }
    if (!Id.isValidId(id)) {
      throw new Error('Ad must have a valid id.')
    }

    return Object.freeze({
      getTitle: () => title,
      getDescription: () => description,
      getId: () => id,
      getCreatedOn: () => createdOn,
    });
  };
}
