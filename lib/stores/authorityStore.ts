import Cookies from 'universal-cookie';
import { create } from 'zustand';
import { Area } from '@/components/views/BroadcastMapView/BroadcastMapView';
import { api, setApiToken } from '@/lib/stores/api';
import { handleApiError } from '@/lib/utils';

interface authorityStoreState {
  loggedInAuthorityId: string | null;
  setLoggedInAuthorityId: (authorityId: string | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  createNewAuthority: (
    loginName: string,
    publicName: string,
    password: string,
    jurisdictionDescription: string,
    jurisdictionMarkers: Area[]
  ) => Promise<boolean>;
}

export const useAuthorityStore = create<authorityStoreState>((set, get) => {
  return {
    loggedInAuthorityId: null,
    login: async (username: string, password: string) => {
      return api
        .login({ loginRequest: { loginName: username, password } })
        .then((x) => {
          setApiToken(x.token);
          set({ loggedInAuthorityId: x.authorityId });

          const cookies = new Cookies();
          cookies.set('token', x.token, { maxAge: 60 * 60 * 24 });
          cookies.set('authorityId', x.authorityId, { maxAge: 60 * 60 * 24 });
          return true;
        })
        .catch((err) => {
          handleApiError(err);
          setApiToken(null);
          set({ loggedInAuthorityId: null });
          return false;
        });
    },
    setLoggedInAuthorityId: (authorityId) => {
      set({ loggedInAuthorityId: authorityId });
    },
    logout: async () => {
      setApiToken(null);
      set({ loggedInAuthorityId: null });
    },
    createNewAuthority: async (
      loginName: string,
      publicName: string,
      password: string,
      jurisdictionDescription: string,
      jurisdictionMarkers: Area[]
    ) => {
      return await api
        .createNewAuthority({
          createNewAuthorityRequest: {
            loginName,
            publicName,
            password,
            jurisdictionDescription,
            jurisdictionMarkers: jurisdictionMarkers.map((x) => ({
              ...x,
              kind: 'CIRCLE',
            })),
          },
        })
        .then((x) => {
          return true;
        })
        .catch((err) => {
          handleApiError(err);
          return false;
        });
    },
  };
});
