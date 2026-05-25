import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    // Валідація
    if (!email.includes('@')) {
      setError('Введіть дійсний email.');
      return;
    }
    if (password.length < 8) {
      setError('Пароль має бути не коротшим за 8 символів.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Паролі не співпадають!');
      return;
    }

    try {
      // Зберігаємо дані в AsyncStorage
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      
      setError('');
      Alert.alert('Успіх', 'Акаунт створено! Тепер ви можете увійти.');
      
      // Повертаємо на екран входу
      navigation.replace('Login');
    } catch (e) {
      setError('Помилка збереження даних.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Створіть пароль:</Text>
      <TextInput 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <Text style={styles.label}>Підтвердіть пароль:</Text>
      <TextInput 
        style={styles.input} 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        secureTextEntry 
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Зареєструватися" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  errorText: { color: 'red', marginBottom: 15, textAlign: 'center' }
});