import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    // Повертаємо користувача на екран входу
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вітаємо на Головному екрані!</Text>
      <Text style={styles.subtitle}>Ви успішно авторизувалися.</Text>
      
      <Button title="Вийти" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30, color: '#555' }
});