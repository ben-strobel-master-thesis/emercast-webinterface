import Cookies from 'universal-cookie';
import { create } from 'zustand';
import { Area } from '@/components/views/BroadcastMapView/BroadcastMapView';
import { AuthorityDTO } from '@/lib/api';
import { api, setApiToken } from '@/lib/stores/api';
import { handleApiError } from '@/lib/utils';

interface authorityStoreState {
  authorities: { [page: number]: AuthorityDTO[] };
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
  fetchAuthorityPage: (page: number) => Promise<void>;
}

export const pageSize = 10;

export const useAuthorityStore = create<authorityStoreState>((set, get) => {
  return {
    loggedInAuthorityId: null,
    authorities: {},
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
    fetchAuthorityPage: async (page: number) => {
      await api
        .getAuthorityPage({ page, pageSize })
        .then((x) => {
          set((state) => {
            const newState = { ...state };
            newState.authorities = { ...state.authorities };
            newState.authorities[page] = x;
            return newState;
          });
        })
        .catch(handleApiError);
    },
  };
});
