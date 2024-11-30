import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const Admin = () => {
    const [loaded, error] = useFonts({
        'JollyLodger': require('../assets/fonts/JollyLodger-Regular.ttf'),
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalData, setModalData] = useState(null);

    const dadosModal = (botao) => {
        switch (botao) {
            case "Todos":
                setModalContent(
                    <View>
                    <Text style={styles.title}>
                        Exibindo todos os usuários
                    </Text>
                    <Pressable>
                        <Text>tabela</Text>
                    </Pressable>
                    </View>
                );
                break;
            case "Um":
                setModalContent(
                    <Text style={styles.title}>
                        Exibindo um usuário
                    </Text>
                );
                break;
            case "Deletar":
                setModalContent(
                    <Text style={styles.title}>
                        Deletando usuário
                    </Text>
                );
                break;
            default:
                setModalContent(null);
                break;
        }
        setModalVisible(true);
    };

    return (
        <ScrollView style={styles.scrollview}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <ScrollView style={styles.modalScrollView}>
                    <View style={styles.modalContainer}>
                        {modalContent}
                        <Pressable style={styles.pressable} onPress={() => setModalVisible(false)}>
                            <Text style={styles.pressableText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>

            <View style={styles.outerContainer}>
                <View style={styles.mainContainer}>
                    <Text style={[styles.title, { fontFamily: 'DancingScript' }]}>Hub dos Admins</Text>
                    <View style={styles.container}>
                        <Pressable style={styles.pressable} onPress={() => dadosModal('Todos')}>
                            <Text style={styles.pressableText}>Todos os Usuários</Text>
                        </Pressable>

                        <Pressable style={styles.pressable} onPress={() => dadosModal('Um')}>
                            <Text style={styles.pressableText}>Selecionar um Usuário</Text>
                        </Pressable>

                        <Pressable style={styles.pressable} onPress={() => dadosModal('Deletar')}>
                            <Text style={styles.pressableText}>Deletar um Usuário</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: '#1d0073',
    },
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#1d0073',
        padding: 10,
    },
    mainContainer: {
        width: '90%',
        backgroundColor: '#240e65',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        marginBottom: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    pressable: {
        backgroundColor: '#3a1c94',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: 'center',
    },
    pressableText: {
        color: '#FFF',
        fontSize: 18,
    },
    modalScrollView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#240e65',
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default Admin;
