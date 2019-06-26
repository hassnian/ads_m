module.exports = function buildMakeUser({ Id }) {
  return function makeUser({
    name,
    id = Id.makeId(),
    favourites = [],
    notifications = [],
    createdOn = new Date(Date.now())
  } = {}) {
    if (!name) {
      throw new Error("User must have a name");
    }
    if (!Id.isValidId(id)) {
      throw new Error("User must have a valid id.");
    }

    return Object.freeze({
      getName: () => name,
      getId: () => id,
      getCreatedOn: () => createdOn,
      getFavourites: () => favourites,
      addFavourite: adId => favourites.push(adId),
      checkIfIsAlreadyFavourited: adId => favourites.includes(adId),
      getNotifications: () => notifications,
      addNotification: ad =>
        notifications.push(`Ad ${ad.title} is no longer available `)
    });
  };
};
