import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Heading, HStack, IconButton, Text, useTheme, VStack, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import firestore from '@react-native-firebase/firestore';

import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Button } from '../components/Button';
import { Order, OrderProps } from '../components/Order';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [statusSelected, setStatisSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpneDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  }

  function handleLogout() {
    auth().signOut()
    .catch(error => {
      console.log(error);
      return Alert.alert('Sair', 'Não foi possível sair.')
    })
  }

  useEffect(() => {
    setIsLoading(true);

    
  }, []);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
       <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
       >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}          
          onPress={handleLogout}
        />
       </HStack> 

       <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            Solicitações
          </Heading>

          <Text color="gray.200">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            type='open'
            title='em andamento'
            onPress={() => setStatisSelected('open')}
            isActive={statusSelected === 'open'}
          />

          <Filter 
            type='closed'
            title='finalizados'
            onPress={() => setStatisSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpneDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {'\n'}
                solicitaçẽs {statusSelected ==='open' ? 'em andamento' : 'finalizadas'}
              </Text>
            </Center>
          )}
        />

        <Button title='Nova solicitação' onPress={handleNewOrder} />
       </VStack>       
    </VStack>
  );
}