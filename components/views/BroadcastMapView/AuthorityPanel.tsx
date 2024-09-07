import { useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import AuthorityCreatePanel from '@/components/views/BroadcastMapView/AuthorityCreatePanel';
import AuthorityList from '@/components/views/BroadcastMapView/AuthorityList';

export default function AuthorityPanel() {
  const [mode, setMode] = useState<'list' | 'create'>('list');

  return (
    <Stack style={{}}>
      <Group style={{ width: '100%' }} justify={'end'}>
        <Button
          color={'dark'}
          variant={mode === 'list' ? undefined : 'outline'}
          onClick={() => {
            if (mode === 'list') {
              setMode('create');
            } else {
              setMode('list');
            }
          }}
        >
          {mode === 'list' ? 'Create Authority' : 'Cancel'}
        </Button>
      </Group>
      {mode === 'list' ? <AuthorityList /> : <AuthorityCreatePanel />}
    </Stack>
  );
}
