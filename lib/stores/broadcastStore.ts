import { create } from 'zustand';
import { BroadcastMessageDTO } from '@/lib/api';
import { api } from '@/lib/stores/api';
import { handleApiError } from '@/lib/utils';

interface broadcastStoreState {
  broadcastMessages: { [page: number]: BroadcastMessageDTO[] };
  createBroadcastMessage: (
    title: string,
    message: string,
    category: string,
    imageUrl: string,
    severity: number,
    forwardUntil: Date,
    latitude: number,
    longitude: number,
    radius: number
  ) => Promise<boolean>;
  fetchBroadcastMessages: (page: number) => Promise<void>;
}

export const pageSize = 10;

export const useBroadcastStore = create<broadcastStoreState>((set, get) => {
  return {
    broadcastMessages: {},
    createBroadcastMessage: async (
      title: string,
      message: string,
      category: string,
      imageUrl: string,
      severity: number,
      forwardUntil: Date,
      latitude: number,
      longitude: number,
      radius: number
    ) => {
      return await api
        .postBroadcastMessage({
          postBroadcastMessageRequest: {
            title,
            message,
            category,
            imageUrl,
            severity,
            forwardUntil,
            latitude,
            longitude,
            radius,
          },
        })
        .then(async (x) => {
          set({ broadcastMessages: {} });
          await get().fetchBroadcastMessages(0).catch(handleApiError);
          return true;
        })
        .catch((err) => {
          handleApiError(err);
          return false;
        });
    },
    fetchBroadcastMessages: async (page: number) => {
      await api
        .getBroadcastMessagesPage({ page, pageSize, systemMessage: false })
        .then((x) => {
          set((state) => {
            const newState = { ...state };
            newState.broadcastMessages = { ...state.broadcastMessages };
            newState.broadcastMessages[page] = x;
            return newState;
          });
        })
        .catch(handleApiError);
    },
  };
});
