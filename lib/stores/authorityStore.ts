import Cookies from 'universal-cookie';
import { create } from 'zustand';
import { api, setApiToken } from '@/lib/stores/api';
import { handleApiError } from '@/lib/utils';

interface authorityStoreState {
  loggedInAuthorityId: string | null;
  setLoggedInAuthorityId: (authorityId: string | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
          cookies.set('token', x.token, { maxAge: 100 * 365 * 24 * 60 * 60 * 60 });
          cookies.set('authorityId', x.authorityId, { maxAge: 100 * 365 * 24 * 60 * 60 * 60 });
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
  };
});
