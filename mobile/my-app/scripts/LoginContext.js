import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    const [album, setAlbum] = useState({});
    const [musica, setMusica] = useState(null)
    const [artista, setArtista] = useState(null)


    return (
        <LoginContext.Provider value={{ token, setToken, userData, setUserData, album, setAlbum, musica, setMusica, artista, setArtista  }}>
            {children}
        </LoginContext.Provider>
    );
};