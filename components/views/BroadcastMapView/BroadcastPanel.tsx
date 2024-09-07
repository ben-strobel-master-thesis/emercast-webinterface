import { useState } from 'react';
import { Button, Group, Stack } from '@mantine/core';
import BroadcastCreatePanel, {
  CreatePanelProps,
} from '@/components/views/BroadcastMapView/BroadcastCreatePanel';
import BroadcastList from '@/components/views/BroadcastMapView/BroadcastList';

interface BroadcastPanelProps {
  createPanelProps: CreatePanelProps;
}

export default function BroadcastPanel({ createPanelProps }: BroadcastPanelProps) {
  const [mode, setMode] = useState<'list' | 'create'>('list');

  return (
    <Stack>
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
          {mode === 'list' ? 'Create Broadcast' : 'Cancel'}
        </Button>
      </Group>
      {mode === 'list' ? (
        <BroadcastList />
      ) : (
        <BroadcastCreatePanel {...createPanelProps} onClose={() => setMode('list')} />
      )}
    </Stack>
  );
}
