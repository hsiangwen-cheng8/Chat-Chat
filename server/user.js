const users = [];
let usersCount = 0;

const addUser = ({id}) => {
    let name = 'Dude'+usersCount;
    usersCount++;

    const user = {id, name};

    users.push(user);
    console.log('finish adding user');
    console.log(user);
    return {user};
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getAllUsers = () =>{
    return users;
}

module.exports = { addUser, removeUser, getUser, getAllUsers};