import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';


const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('./img/logo.png')} style={styles.logo} />
        
        {/* Botão de Login */}
        <View style={styles.buttonContainer}>
          <Link href={'/Login'} >
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </Link>
        </View>

        {/* Botão de Cadastro */}
        <View style={styles.buttonContainer}>
        <Link href={`http://localhost:8081/Registro`} >
          <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Cadastro</Text>
          </Pressable>
        </Link>
        </View>
      </View>
    </View>
  );
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
  },
  logo: {
    width: 250, 
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#FFF',
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: '#6257ff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  
});

export default HomeScreen;
