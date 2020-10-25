// Should have the following properties
/*
    this.id 
    this.name
    this.created
    this.updated
    this.email
    this.active
*/

const addUser = (user) => {
  Object.assign(currentUser, user);
};

const currentUser = {};

export { currentUser ,addUser};
