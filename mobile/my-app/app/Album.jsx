import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Text, Image, FlatList, Pressable, ScrollView } from "react-native";
import { AppContext } from "../../scripts/LoginContext";
import { Redirect } from "expo-router";
import Header from "../../components/Header";


const AlbumDetalhes = () => {
  const { albumAtual, setAlbumAtual } = useContext(AppContext);
  const { musicaAtual, setMusicaAtual } = useContext(AppContext);

  if (musicaAtual) {
    return <Redirect href={"/musica"} />;
  }

  const [dadosAlbum, setDadosAlbum] = useState({});
  const [musicasAlbum, setMusicasAlbum] = useState([]);

  useEffect(() => {
    const carregarAlbum = async () => {
      try {
        const resposta = await fetch("http://localhost:8000/geral/getAlbum", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: albumAtual }),
        });

        if (resposta.ok) {
          const dados = await resposta.json();
          setDadosAlbum(dados.album);
          setMusicasAlbum(dados.musicas);
          setAlbumAtual(null);
        }
      } catch (erro) {
        console.error("Erro ao carregar o álbum:", erro);
      }
    };

    carregarAlbum();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#1d0073" }}>
      <Header titulo="Detalhes do Álbum" />
      <View style={styles.containerPrincipal}>
        <Image source={{ uri: dadosAlbum.coverImageUrl }} style={styles.capaAlbum} />
        <Text style={styles.tituloAlbum}>{dadosAlbum.title}</Text>

        <View style={styles.listaMusicas}>
          <FlatList
            data={musicasAlbum}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable onPress={() => setMusicaAtual(item.id)}>
                <View style={styles.containerMusica}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: dadosAlbum.coverImageUrl }}
                      style={styles.imagemMusica}
                    />
                    <Text style={styles.textoMusica}>{item.titulo}</Text>
                  </View>
                  <Text style={styles.textoMusica}>
                    {Math.trunc(item.duracao / 60).toString().padStart(2, "0")}:
                    {(item.duracao % 60).toString().padStart(2, "0")}
                  </Text>
                </View>
              </Pressable>
            )}
            contentContainerStyle={{ gap: 10 }}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    capaAlbum: {
      width: 200,
      height: 200,
    },
    containerPrincipal: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#240e65",
      paddingVertical: 20,
    },
    containerMusica: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      padding: 10,
      borderBottomColor: "#FFF",
      borderBottomWidth: 2,
    },
    imagemMusica: {
      width: 65,
      height: 65,
    },
    tituloAlbum: {
      color: "#FFF",
      fontSize: 25,
      fontWeight: "bold",
      marginVertical: 10,
    },
    listaMusicas: {
      backgroundColor: "#3a1c94",
      borderRadius: 10,
      width: "90%",
      padding: 15,
      marginBottom: 20,
    },
    textoMusica: {
      fontSize: 17,
      color: "#FFF",
    },
  });
  
export default AlbumDetalhes;
