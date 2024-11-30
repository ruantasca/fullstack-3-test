import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { router, Link } from 'expo-router';
import { LoginContext } from '../scripts/LoginContext';

const Home = () => {
  const { userData, setUserData } = useContext(LoginContext);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('teste', userData)
  const fetchArtists = async () => {
    try {
      const response = await fetch('http://localhost:8000/artista/');
      const data = await response.json();
      console.log(data); 
      setArtists(data);
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Link href={`/Perfil`}>
          <Pressable>
            <Image source={{ uri: userData.foto }} style={styles.perfil1} />
          </Pressable>
        </Link>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#AAA" />
          <Pressable style={styles.settingsButton}>
            <Text style={styles.settingsText}>⚙️</Text>
          </Pressable>
        </View>

        <View style={styles.gridContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#FFF" />
          ) : (
            <FlatList
              data={artists}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.artistCard}>
                  <Image source={{ uri: item.imageUrl }} style={styles.artistImage} />
                  <Text style={styles.artistName}>{item.nome}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>

      <View style={styles.musicPlayer}>
        <Text style={styles.songTitle}>nome</Text>
        <View style={styles.progressBar}></View>
        <View style={styles.controls}>
          <Text style={styles.controlButton}>⏮️</Text>
          <Text style={styles.controlButton}>⏯️</Text>
          <Text style={styles.controlButton}>⏭️</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1d0073',
  },
  sidebar: {
    width: '10%',
    backgroundColor: '#3a1c94',
    alignItems: 'center',
    paddingTop: 20,
  },
  perfil1: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  mainContent: {
    width: '85%',
    padding: 10,
    backgroundColor: '#240e65',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a1c94',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
  },
  settingsButton: {
    marginLeft: 10,
  },
  settingsText: {
    color: '#FFF',
    fontSize: 18,
  },
  gridContainer: {
    flex: 1,
  },
  artistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a1c94',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  artistName: {
    color: '#FFF',
    fontSize: 16,
  },
  musicPlayer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1d0073',
    padding: 10,
    alignItems: 'center',
  },
  songTitle: {
    color: '#FFF',
    fontSize: 16,
  },
  progressBar: {
    width: '80%',
    height: 5,
    backgroundColor: '#AAA',
    borderRadius: 5,
    marginVertical: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  controlButton: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default Home;