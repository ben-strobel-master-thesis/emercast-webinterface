import { useEffect, useState } from 'react';
import { Group, NumberInput, PasswordInput, Stack, Textarea, TextInput } from '@mantine/core';
import AsyncActionButton from '@/components/input/AsyncActionButton';
import { CreatePanelProps } from '@/components/views/BroadcastMapView/BroadcastCreatePanel';
import { Area } from '@/components/views/BroadcastMapView/BroadcastMapView';
import { useAuthorityStore } from '@/lib/stores/authorityStore';

type AuthorityCreatePanel = CreatePanelProps & { onClose: () => void };

export default function AuthorityCreatePanel({
  selectedArea,
  setSelectedArea,
  selectable,
  setSelectable,
  onClose,
}: AuthorityCreatePanel) {
  const createAuthority = useAuthorityStore((state) => state.createNewAuthority);

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

  const [loginName, setLoginName] = useState<string>('');
  const [publicName, setPublicName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [jurisdictionDescription, setJurisdictionDescription] = useState<string>('');
  const [position, setPosition] = useState<Area | null>(null);

  return (
    <Stack>
      <TextInput
        label={'Login Name'}
        placeholder={'Authority login name'}
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
      />
      <TextInput
        label={'Public Name'}
        placeholder={'Authority public name'}
        value={publicName}
        onChange={(e) => setPublicName(e.target.value)}
      />
      <PasswordInput
        label={'Password'}
        placeholder={'Authority password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Textarea
        label={'Jurisdiction Description'}
        placeholder={'Authority jurisdiction description'}
        value={jurisdictionDescription}
        onChange={(e) => setJurisdictionDescription(e.target.value)}
      />
      <Group wrap={'nowrap'}>
        <TextInput
          label={'Jurisdiction Position'}
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
      <AsyncActionButton
        disabled={
          position === null ||
          loginName.trim().length === 0 ||
          publicName.trim().length === 0 ||
          password.trim().length === 0 ||
          jurisdictionDescription.trim().length === 0
        }
        blocking
        color={'dark'}
        action={async () => {
          if (position === null) return;
          await createAuthority(loginName, publicName, password, jurisdictionDescription, [
            position,
          ]).then((x) => {
            if (x) {
              setSelectedArea(null);
              onClose();
            }
          });
        }}
      >
        Create new authority
      </AsyncActionButton>
    </Stack>
  );
}
