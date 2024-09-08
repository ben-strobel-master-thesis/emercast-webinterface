import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Button, Group, NumberInput, Stack, Textarea, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import AsyncActionButton from '@/components/input/AsyncActionButton';
import { Area } from '@/components/views/BroadcastMapView/BroadcastMapView';
import { useBroadcastStore } from '@/lib/stores/broadcastStore';

export interface CreatePanelProps {
  selectedArea: Area | null;
  setSelectedArea: (value: Area | null) => void;
  selectable: boolean;
  setSelectable: (value: boolean) => void;
}

type BroadcastCreatePanelProps = CreatePanelProps & { onClose: () => void };

export default function BroadcastCreatePanel({
  selectedArea,
  setSelectedArea,
  selectable,
  setSelectable,
  onClose,
}: BroadcastCreatePanelProps) {
  const createBroadcast = useBroadcastStore((state) => state.createBroadcastMessage);

  useEffect(() => {
    setSelectable(true);
    return () => setSelectable(false);
  }, [setSelectable]);

  useEffect(() => {
    if (selectable) {
      setPosition((value) => {
        if (selectedArea == null) return null;
        return { ...selectedArea };
      });
    }
  }, [selectedArea]);

  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [severity, setSeverity] = useState<number>(1);
  const [position, setPosition] = useState<Area | null>(null);
  const [forwardUntil, setForwardUntil] = useState<Date>(dayjs().add(1, 'days').toDate());

  return (
    <Stack>
      <TextInput
        label={'Title'}
        placeholder={'Message title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Group wrap={'nowrap'}>
        <TextInput
          label={'Category'}
          placeholder={'Message category'}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <NumberInput
          label={'Severity'}
          placeholder={'Message severity'}
          allowNegative={false}
          allowDecimal={false}
          value={severity}
          onChange={(v) => setSeverity(v as number)}
        />
      </Group>
      <Group wrap={'nowrap'}>
        <TextInput
          label={'Position'}
          placeholder={'Click on map to select'}
          onChange={(e) => {}}
          value={position === null ? '' : `[${position?.latitude};${position?.longitude}]`}
        />
        <NumberInput
          label={'Radius'}
          placeholder={'Message radius'}
          value={selectedArea?.radiusMeter}
          disabled={!selectedArea}
          allowNegative={false}
          allowDecimal={false}
          stepHoldInterval={100}
          suffix={'m'}
          onChange={(v) =>
            setSelectedArea(selectedArea ? { ...selectedArea, radiusMeter: v as number } : null)
          }
        />
      </Group>
      <DateTimePicker
        label={'Valid Until'}
        value={forwardUntil}
        onChange={(e) => {
          if (e === null) return;
          setForwardUntil(e);
        }}
      />
      <Textarea
        label={'Content'}
        placeholder={'Message content'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <AsyncActionButton
        disabled={
          position === null ||
          title.trim().length === 0 ||
          category.trim().length === 0 ||
          message.trim().length === 0
        }
        action={async () => {
          if (position === null) return;
          await createBroadcast(
            title,
            message,
            category,
            '',
            severity,
            forwardUntil,
            position.latitude,
            position.longitude,
            position.radiusMeter
          ).then((x) => {
            if (x) {
              setSelectedArea(null);
              onClose();
            }
          });
        }}
        blocking
        color={'dark'}
      >
        Send new broadcast
      </AsyncActionButton>
    </Stack>
  );
}
