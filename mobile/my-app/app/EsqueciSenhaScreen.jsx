import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

const EsqueciSenhaScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await fetch("http://localhost:8000/autenticacao/esqueci-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const message = await response.text();
      Alert.alert("Redefinição de Senha", message);

      if (response.ok) {
        router.push('/Login');
      }
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      Alert.alert("Erro", "Não foi possível solicitar a redefinição de senha.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        placeholderTextColor="#FFF"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua nova senha"
        placeholderTextColor="#FFF"
        value={senha}
        onChangeText={setSenha}
      />
      <View style={styles.buttonContainer}>
        <Button title="Enviar Solicitação" color="#2e23ca" onPress={handleResetPassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d0073',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FFF',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Jolly Lodger',
  },
  label: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#2e23ca',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#FFF',
    backgroundColor: '#1d0073',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
  },
});

export default EsqueciSenhaScreen;
