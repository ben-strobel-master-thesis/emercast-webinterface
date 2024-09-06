import { create } from 'zustand';
import { api, setApiToken } from '@/lib/stores/api';
import { handleApiError } from '@/lib/utils';

interface authorityStoreState {
  loggedInAuthorityId: string | null;
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
          return true;
        })
        .catch((err) => {
          handleApiError(err);
          setApiToken(null);
          set({ loggedInAuthorityId: null });
          return false;
        });
    },
    logout: async () => {
      setApiToken(null);
      set({ loggedInAuthorityId: null });
    },
  };
});
