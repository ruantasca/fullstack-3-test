import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { useFonts } from "expo-font";
import { LoginContext } from "../scripts/LoginContext";

const LoginScreen = () => {
  //fonte
  const [loaded, error] = useFonts({
    'JollyLodger': require('../assets/fonts/JollyLodger-Regular.ttf'),
  });
  //declarar as funções de emeil e senha que colocamos na caixa de texto
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { token, setToken, userData, setUserData } = useContext(LoginContext)

  //ao clicar em logar se der certo ele manda para outra pagina.
  //se der errado ele manda uma mensagem de erro
  const handlelogar = async () => {
    try {
      const response = await fetch("http://localhost:8000/autenticacao/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
        },
        body: JSON.stringify({
          "email": email,
          "senha": senha,
        }),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setToken(JSON.stringify(data.tokenJWT))
        setUserData(data.userData)
        router.push("/Home")
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Erro ao logar usuário");
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#FFF"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          placeholderTextColor="#FFF"
          value={senha}
          onChangeText={setSenha}
        />


      <Text style={styles.forgotPassword} onPress={() => router.push('http://localhost:8081/EsqueciSenhaScreen')}>
          Esqueci senha
       </Text>

        <Link href={`http://localhost:8081/Registro`}>
          <Text style={styles.forgotPassword}>
            cadastrar-se
          </Text>
        </Link>

        <View style={styles.buttonContainer}>
          <Button title="Entrar" color="#2e23ca" onPress={handlelogar} />
        </View>
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d0073',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#240e65',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 52,
    color: '#FFF',
    marginBottom: 30,
    fontFamily: 'Jolly Lodger'
  },
  label: {
    fontSize: 28,
    color: '#FFF',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
    fontFamily: 'Jolly Lodger',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#2e23ca',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: '#FFF',
    backgroundColor: '#1d0073',
  },
  forgotPassword: {
    color: '#FFF',
    fontSize: 14,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
    fontFamily: 'Jolly Lodger',
  },
});

export default LoginScreen;
