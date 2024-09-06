import React from 'react';
import { Stack, Text, Title } from '@mantine/core';
import Logo from '@/components/Logo';

export default function SplashScreen() {
  return (
    <Stack style={{ height: '90vh', width: '100%', marginTop: 100 }} align={'center'}>
      <Title style={{ fontSize: '50px' }}>Welcome to Emercast</Title>
      <Logo />
      <Text>Please log in to proceed</Text>
    </Stack>
  );
}
