import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { IconEye, IconEyeCancel, IconEyeOff, IconX } from '@tabler/icons-react';
import { ActionIcon, Group, Paper, ScrollArea, Stack, Text, Tooltip } from '@mantine/core';
import ActionIfVisible from '@/components/common/ActionIfVisible';
import { AuthorityDTO } from '@/lib/api';
import { useAuthorityStore } from '@/lib/stores/authorityStore';
import { pageSize } from '@/lib/stores/broadcastStore';

interface AuthorityListProps {
  selectedAuthority: AuthorityDTO | null;
  setSelectedAuthority: (selectedAuthority: AuthorityDTO | null) => void;
}

export default function AuthorityList({
  selectedAuthority,
  setSelectedAuthority,
}: AuthorityListProps) {
  const fetchAuthorityPage = useAuthorityStore((state) => state.fetchAuthorityPage);
  const authorities = useAuthorityStore((state) => state.authorities);

  useEffect(() => {
    fetchAuthorityPage(0);
  }, []);

  const allAuthorities = useMemo(() => {
    return Object.values(authorities).flat(1);
  }, [authorities]);

  const lastPage = useMemo(() => {
    let sorted = Object.entries(authorities).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    if (sorted.length === 0) return -1;
    let last = sorted[sorted.length - 1];
    return parseInt(last[0]);
  }, [authorities]);

  const hasMorePages = useMemo(() => {
    let sorted = Object.entries(authorities).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    if (sorted.length === 0) return false;
    let last = sorted[sorted.length - 1];
    return last[1].length >= pageSize;
  }, [authorities]);

  return (
    <ScrollArea h={'75vh'}>
      <Stack style={{ marginTop: '1rem' }}>
        {allAuthorities.length === 0 && (
          <Paper style={{ width: '100%' }} shadow="sm" p="xl" withBorder>
            <Stack align={'center'}>
              <IconX />
              <Text style={{ textAlign: 'center' }}>There are no authorities</Text>
            </Stack>
          </Paper>
        )}
        {allAuthorities.map((x) => (
          <Paper
            style={{
              width: '100%',
              border: x.id === selectedAuthority?.id ? 'black 2px solid' : undefined,
            }}
            shadow="sm"
            p="xl"
            withBorder
          >
            <Group wrap={'nowrap'}>
              <Stack gap={'xs'} style={{ width: '78%' }}>
                <Text fw={700}>{`Name: ${x.publicName}`}</Text>
                <Text size={'xs'}>{`Created: ${dayjs.unix(x.created)}`}</Text>
              </Stack>
              <Stack style={{ width: '18%' }}>
                <Tooltip label={x.id === selectedAuthority?.id ? 'Hide from map' : 'Show on map'}>
                  <ActionIcon
                    variant={'subtle'}
                    color={'dark'}
                    size={'sm'}
                    onClick={() => {
                      if (x.id === selectedAuthority?.id) {
                        setSelectedAuthority(null);
                      } else {
                        setSelectedAuthority(x);
                      }
                    }}
                  >
                    {x.id === selectedAuthority?.id ? <IconEyeOff /> : <IconEye />}
                  </ActionIcon>
                </Tooltip>
              </Stack>
            </Group>
          </Paper>
        ))}
        {hasMorePages && (
          <ActionIfVisible
            action={() => {
              fetchAuthorityPage(lastPage + 1);
            }}
            disabled={false}
          >
            <div></div>
          </ActionIfVisible>
        )}
      </Stack>
    </ScrollArea>
  );
}
