import { Heading, VStack, Icon, useTheme } from "native-base";
import { Envelope, Key } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export default function SignIn() {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta {name}
      </Heading>

      <Input
        m={2}
        w='full'
        placeholder="E-mail" 
        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
        onChangeText={setName}
      />
      <Input 
        m={2}
        mb={8}
        w='full'
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" w="full" />
    </VStack>
  )
}