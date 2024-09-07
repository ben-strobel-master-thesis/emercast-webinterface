import { Circle, MapContainer, Marker, Pane, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import { LeafletMouseEvent } from 'leaflet';
import { Stack, Text } from '@mantine/core';
import { Area } from '@/components/views/BroadcastMapView/BroadcastMapView';
import MapEventReceiver from '@/components/views/BroadcastMapView/MapEventReceiver';
import { useBroadcastStore } from '@/lib/stores/broadcastStore';

interface MapProps {
  onClick: (e: LeafletMouseEvent) => void;
  selectedArea: Area | null;
}

export default function Map({ onClick, selectedArea }: MapProps) {
  const broadcasts = useBroadcastStore((state) => state.broadcastMessages);

  return (
    <MapContainer center={[48.1351, 11.582]} zoom={11} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventReceiver onClick={onClick} />
      {selectedArea && (
        <Pane name={'SelectedArea'}>
          <Circle
            center={[selectedArea.latitude, selectedArea.longitude]}
            radius={selectedArea.radiusMeter}
          ></Circle>
        </Pane>
      )}
      {Object.values(broadcasts)
        .flat(1)
        .map((x) => (
          <Pane name={x.id}>
            <Marker position={[x.latitude, x.longitude]}>
              <Popup>
                <Stack>
                  <Text fw={700}>{x.title}</Text>
                  <Text size={'sm'}>{`Created: ${new Date(x.created)}`}</Text>
                  <Text size={'sm'}>{`Valid Until: ${new Date(x.forwardUntil)}`}</Text>
                  <Text>{x.message}</Text>
                </Stack>
              </Popup>
            </Marker>
            <Circle center={[x.latitude, x.longitude]} radius={x.radius}></Circle>
          </Pane>
        ))}
    </MapContainer>
  );
}
