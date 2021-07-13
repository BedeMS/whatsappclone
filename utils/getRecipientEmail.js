const getRecipientEmail = (users, userLoggedIn) => {
//   console.log(users, userLoggedIn);
    // this function gets us the email of our chat
  return users?.filter(
    (userToFilter) => userToFilter !== userLoggedIn?.email
  )[0];
};

export default getRecipientEmail;
