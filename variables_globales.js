let AccountLogged = false;
//let AccountLogged;
let Darkmode = false;
let Username = "UsuarioPrueba";

const setAccountLogged = (value) => {
    AccountLogged = value;
};

const setUsername = (value) => {
    Username = value;   
};

const setDarkmode = (value) => {
    Darkmode = value;   
};

export { AccountLogged, setAccountLogged, Username, setUsername, Darkmode, setDarkmode };
