import BroadcastMapView from '@/components/views/BroadcastMapView';
import SplashScreen from '@/components/views/SplashScreen';
import { useAuthorityStore } from '@/lib/stores/authorityStore';

export default function HomePage() {
  const loggedInAuthorityId = useAuthorityStore((state) => state.loggedInAuthorityId);

  return <>{loggedInAuthorityId === null ? <SplashScreen /> : <BroadcastMapView />}</>;
}
