export const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    providerId: user.providerData[0].providerId,
    photoURL: user.photoURL,
  };
};
