import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';

const Pagamento = () => {
    const [nome, setNome] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');
    const [valor, setValor] = useState('');

    const handlePagamento = () => {
        if (nome && numeroCartao && validade && cvv && valor) {
            Alert.alert("Pagamento realizado com sucesso!", `Valor: R$ ${valor}`);
        } else {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Tela de Pagamento</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome no Cartão:</Text>
                    <TextInput
                        style={styles.input}
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        placeholder="Nome completo"
                        placeholderTextColor="#b0b0b0"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Número do Cartão:</Text>
                    <TextInput
                        style={styles.input}
                        value={numeroCartao}
                        onChangeText={(text) => setNumeroCartao(text)}
                        placeholder="0000 0000 0000 0000"
                        placeholderTextColor="#b0b0b0"
                        keyboardType="numeric"
                        maxLength={16}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Validade:</Text>
                    <TextInput
                        style={styles.input}
                        value={validade}
                        onChangeText={(text) => setValidade(text)}
                        placeholder="MM/AA"
                        placeholderTextColor="#b0b0b0"
                        keyboardType="numeric"
                        maxLength={5}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>CVV:</Text>
                    <TextInput
                        style={styles.input}
                        value={cvv}
                        onChangeText={(text) => setCvv(text)}
                        placeholder="000"
                        placeholderTextColor="#b0b0b0"
                        keyboardType="numeric"
                        maxLength={3}
                        secureTextEntry
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Valor:</Text>
                    <TextInput
                        style={styles.input}
                        value={valor}
                        onChangeText={(text) => setValor(text)}
                        placeholder="R$ 0,00"
                        placeholderTextColor="#b0b0b0"
                        keyboardType="numeric"
                    />
                </View>

                <Pressable style={styles.button} onPress={handlePagamento}>
                    <Text style={styles.buttonText}>Realizar Pagamento</Text>
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
        flex: 1,
        backgroundColor: '#240e65',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontSize: 28,
        color: '#FFF',
        marginBottom: 20,
    },
    inputContainer: {
        marginTop: 15,
        width: '100%',
    },
    label: {
        color: 'white',
        fontSize: 18,
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
    button: {
        backgroundColor: '#6257ff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Pagamento;
