import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useData } from './DataContext';

interface LojaItem {
  id: string;
  nome: string;
  imagem: any;
  preco: number;
}

const itensLoja: LojaItem[] = [
  {
    id: 'coroa',
    nome: 'Coroa',
    imagem: require('../assets/Assets MINDRA/Coroa bunita.png'),
    preco: 500,
  },
  {
    id: 'coleira',
    nome: 'Coleira Dourada',
    imagem: require('../assets/Assets MINDRA/Coleira dourada.png'),
    preco: 350,
  },
  {
    id: 'fone',
    nome: 'Fone',
    imagem: require('../assets/Assets MINDRA/Fone.png'),
    preco: 400,
  },
];

const itensPromocao: LojaItem[] = [
  {
    id: 'cama_magica',
    nome: 'Cama Mágica',
    imagem: require('../assets/Assets MINDRA/Cama magica.png'),
    preco: 300,
  },
  {
    id: 'cartola',
    nome: 'Cartola',
    imagem: require('../assets/Assets MINDRA/Cartola.png'),
    preco: 300,
  },
];

export default function Loja() {
  const { pontos, comprarItem, itensComprados } = useData();
  const [comprando, setComprando] = useState<string | null>(null);

  const handleComprar = (item: LojaItem) => {
    if (itensComprados.includes(item.id)) {
      Alert.alert('Atenção', 'Você já comprou este item!');
      return;
    }
    if (pontos < item.preco) {
      Alert.alert('Pontos insuficientes', `Você precisa de ${item.preco} pontos, mas tem apenas ${pontos}.`);
      return;
    }
    setComprando(item.id);
    Alert.alert(
      'Confirmar compra',
      `Deseja comprar ${item.nome} por ${item.preco} pontos?`,
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => setComprando(null) },
        {
          text: 'Comprar',
          onPress: () => {
            const sucesso = comprarItem(item.id, item.preco);
            setComprando(null);
            if (sucesso) {
              Alert.alert('Compra realizada!', `Você comprou ${item.nome}!`);
            } else {
              Alert.alert('Erro', 'Não foi possível realizar a compra.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.pontosBadge}>
          <Text style={styles.pontosText}>{pontos} Pontos</Text>
        </View>
        <View style={styles.perfilIcon}>
          <Text style={styles.perfilIconText}>👤</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Promoção do dia */}
        <View style={styles.promoCard}>
          <View style={styles.promoHeader}>
            <Text style={styles.promoTitle}>⭐ Promoção do dia ⭐</Text>
          </View>
          <View style={styles.promoItems}>
            {itensPromocao.map((item) => {
              const jaComprou = itensComprados.includes(item.id);
              return (
                <View key={item.id} style={styles.promoItemCard}>
                  <Image source={item.imagem} style={styles.promoItemImage} resizeMode="contain" />
                  <Text style={styles.promoItemNome}>{item.nome}</Text>
                  <TouchableOpacity
                    style={[styles.btnComprarPromo, jaComprou && styles.btnComprado]}
                    onPress={() => handleComprar(item)}
                    disabled={jaComprou}
                  >
                    <Text style={styles.btnComprarText}>
                      {jaComprou ? 'Comprado ✓' : `${item.preco} Pontos`}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* Itens da Loja */}
        <Text style={styles.sectionTitle}>Itens disponíveis</Text>
        <View style={styles.itensGrid}>
          {itensLoja.map((item) => {
            const jaComprou = itensComprados.includes(item.id);
            return (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImageContainer}>
                  <Image source={item.imagem} style={styles.itemImage} resizeMode="contain" />
                </View>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <TouchableOpacity
                  style={[styles.btnComprar, jaComprou && styles.btnComprado]}
                  onPress={() => handleComprar(item)}
                  disabled={jaComprou}
                >
                  <Text style={styles.btnComprarText}>
                    {jaComprou ? 'Comprado ✓' : `${item.preco} pts`}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A7BD5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
  },
  pontosBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pontosText: {
    color: '#3A7BD5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  perfilIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  perfilIconText: {
    fontSize: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  promoCard: {
    backgroundColor: '#FFF9C4',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F9A825',
    overflow: 'hidden',
    marginBottom: 20,
  },
  promoHeader: {
    backgroundColor: '#FFD54F',
    paddingVertical: 10,
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
  },
  promoItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 14,
  },
  promoItemCard: {
    alignItems: 'center',
    width: '45%',
  },
  promoItemImage: {
    width: 70,
    height: 70,
    marginBottom: 6,
  },
  promoItemNome: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 6,
  },
  btnComprarPromo: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  btnComprar: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  btnComprado: {
    backgroundColor: '#9E9E9E',
  },
  btnComprarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  itensGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1A3A6E',
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImageContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemImage: {
    width: 60,
    height: 60,
  },
  itemNome: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A3A6E',
    marginBottom: 6,
    textAlign: 'center',
  },
});
