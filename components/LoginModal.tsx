import React, { useState } from 'react';
import { Button, Center, Modal, PasswordInput, Space, Text, TextInput, Title } from '@mantine/core';
import AsyncActionButton from '@/components/AsyncActionButton';
import { useAuthorityStore } from '@/lib/stores/authorityStore';

interface LoginModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export default function LoginModal({ show, setShow }: LoginModalProps) {
  const login = useAuthorityStore((state) => state.login);

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  return (
    <Modal
      opened={show}
      onClose={() => {
        setShow(false);
      }}
      title={
        <Center inline>
          <Title order={3}>{'Log in'}</Title>
        </Center>
      }
    >
      <TextInput
        label={'Username'}
        placeholder={'Username'}
        value={usernameInput}
        onChange={(event) => setUsernameInput(event.currentTarget.value)}
        required
      />
      <PasswordInput
        label={'Password'}
        placeholder={'Password'}
        value={passwordInput}
        onChange={(event) => setPasswordInput(event.currentTarget.value)}
        required
      />
      <Space h={'lg'} />
      <AsyncActionButton
        fullWidth
        blocking
        loaderPos={'left'}
        color={'dark'}
        disabled={usernameInput.length === 0 || passwordInput.length === 0}
        action={async () => {
          await login(usernameInput, passwordInput);
        }}
      >
        {'Log in'}
      </AsyncActionButton>
    </Modal>
  );
}
