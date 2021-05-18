export const getUserId = (user) => {
  return `#${user.uid.substring(0, 6)}`;
};
