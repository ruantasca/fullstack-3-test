import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LoginContext } from "../scripts/LoginContext";

const Perfil = () => {
    const [senha, setSenha] = useState('');
    const { token, setToken, userData, setUserData } = useContext(LoginContext);

    console.log(userData)
    useEffect(() => {
    }, []);

    const selecionarFoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Precisamos de permissão para acessar sua galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const fotoUri = result.assets[0].uri;
            setUserData({...userData, foto: fotoUri});
        }
    };

    const atualizarSenha = async () => {
        if (!senha) {
            alert('Preencha o campo de senha.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/usuarios/trocarsenha', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userData.email, senha: senha }),
            });

            if (response.ok) {
                alert('Senha atualizada com sucesso!');
                setSenha('');
            } else {
                const error = await response.json();
                alert('Erro', error.message || 'Não foi possível atualizar a senha.');
            }
        } catch (error) {
            console.error('Erro ao atualizar senha:', error);
            alert('Ocorreu um erro ao atualizar a senha.');
        }
    };

    useEffect(() => {
        const trocaFoto = async() => {
            try{
                const response = await fetch('http://localhost:8000/usuarios/trocarfoto', {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({email: userData.email, alt: userData.foto})
                })
                console.log(response)
            }catch(e){
                console.log(e)
            }
        }
        trocaFoto()
    }, [userData.foto])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                {userData.foto ? (
                    <Image source={{ uri: userData.foto }} style={styles.fotoPerfil} />
                ) : (
                    <Image source={require('./img/perfil.png')} style={styles.logo} />
                )}

                <Pressable onPress={selecionarFoto} style={styles.botao}>
                    <Text style={styles.botaoTexto}>Alterar Foto de Perfil</Text>
                </Pressable>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.email}
                        editable={false} // O email não pode ser editado
                        placeholderTextColor="#b0b0b0"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nova Senha:</Text>
                    <TextInput
                        style={styles.input}
                        value={senha}
                        onChangeText={setSenha}
                        placeholder="Nova senha"
                        placeholderTextColor="#b0b0b0"
                        secureTextEntry
                    />
                </View>

                <Pressable onPress={atualizarSenha} style={styles.botao}>
                    <Text style={styles.botaoTexto}>Atualizar Senha</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d0073',
        padding: 20,
    },
    innerContainer: {
        backgroundColor: '#240e65',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    fotoPerfil: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: 20,
        width: '80%',
    },
    label: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#6257ff',
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 16,
        width: '100%',
    },
    botao: {
        marginTop: 20,
        backgroundColor: '#3e2ea6',
        padding: 10,
        borderRadius: 10,
    },
    botaoTexto: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Perfil;