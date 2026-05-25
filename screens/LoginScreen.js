import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Витягуємо збережені дані з локального сховища
      const savedEmail = await AsyncStorage.getItem('userEmail');
      const savedPassword = await AsyncStorage.getItem('userPassword');

      // Перевіряємо, чи взагалі хтось реєструвався
      if (!savedEmail || !savedPassword) {
        setError('Користувача не знайдено. Будь ласка, зареєструйтесь.');
        return;
      }

      // Перевіряємо збіг введених даних із тими, що в базі
      if (email === savedEmail && password === savedPassword) {
        setError('');
        navigation.replace('Home'); // Пускаємо на Головну
      } else {
        setError('Невірний email або пароль.');
      }
    } catch (e) {
      setError('Помилка читання даних.');
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

      <Text style={styles.label}>Пароль:</Text>
      <TextInput 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Увійти" onPress={handleLogin} />
      
      <View style={styles.spacer} />
      
      <Button 
        title="Немає акаунту? Зареєструватися" 
        onPress={() => navigation.navigate('Registration')} 
        color="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  errorText: { color: 'red', marginBottom: 15, textAlign: 'center' },
  spacer: { height: 15 }
});