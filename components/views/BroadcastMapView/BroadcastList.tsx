import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react';
import { IconX } from '@tabler/icons-react';
import { Paper, ScrollArea, Stack, Text } from '@mantine/core';
import ActionIfVisible from '@/components/common/ActionIfVisible';
import { pageSize, useBroadcastStore } from '@/lib/stores/broadcastStore';

export default function BroadcastList() {
  const fetchBroadcastMessages = useBroadcastStore((state) => state.fetchBroadcastMessages);
  const broadcastMessages = useBroadcastStore((state) => state.broadcastMessages);

  useEffect(() => {
    fetchBroadcastMessages(0);
  }, []);

  const allMessages = useMemo(() => {
    return Object.values(broadcastMessages).flat(1);
  }, [broadcastMessages]);

  const lastPage = useMemo(() => {
    let sorted = Object.entries(broadcastMessages).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    if (sorted.length === 0) return -1;
    let last = sorted[sorted.length - 1];
    return parseInt(last[0]);
  }, [broadcastMessages]);

  const hasMorePages = useMemo(() => {
    let sorted = Object.entries(broadcastMessages).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    if (sorted.length === 0) return false;
    let last = sorted[sorted.length - 1];
    return last[1].length >= pageSize;
  }, [broadcastMessages]);

  return (
    <ScrollArea h={'75vh'}>
      <Stack style={{ marginTop: '1rem' }}>
        {allMessages.length === 0 && (
          <Paper style={{ width: '100%' }} shadow="sm" p="xl" withBorder>
            <Stack align={'center'}>
              <IconX />
              <Text style={{ textAlign: 'center' }}>There are no active broadcast messages</Text>
            </Stack>
          </Paper>
        )}
        {allMessages.map((x) => (
          <Paper style={{ width: '100%' }} shadow="sm" p="xl" withBorder>
            <Stack gap={'xs'}>
              <Text fw={700}>{`Title: ${x.title}`}</Text>
              <Text size={'xs'}>{`Created: ${dayjs.unix(x.created)}`}</Text>
              <Text size={'xs'}>{`Valid Until: ${dayjs.unix(x.forwardUntil)}`}</Text>
              <Text size={'sm'}>{`Content: ${x.message}`}</Text>
            </Stack>
          </Paper>
        ))}
        {hasMorePages && (
          <ActionIfVisible
            action={() => {
              fetchBroadcastMessages(lastPage + 1);
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
