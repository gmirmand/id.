export const getUserId = (user) => {
  return `#${user.uid.substring(0, 6)}`;
};

export const getFullUser = (user) => {
  return `${user.name}${getUserId(user)}`;
};
