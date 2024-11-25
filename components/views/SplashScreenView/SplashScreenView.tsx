import React from 'react';
import { Stack, Text, Title } from '@mantine/core';
import Logo from '@/components/common/Logo';

export default function SplashScreenView() {
  return (
    <Stack style={{ height: '90vh', width: '100%', marginTop: 100 }} align={'center'}>
      <Title style={{ fontSize: '50px' }}>Welcome to Emercast</Title>
      <Logo style={{ width: '15rem', height: '15rem' }} />
      <Text>Please log in to proceed</Text>
      <Text>Contact benedikt.strobel@tum.de to gain access to this system</Text>
    </Stack>
  );
}
