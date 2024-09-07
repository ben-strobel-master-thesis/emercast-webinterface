import { NotificationData, notifications } from '@mantine/notifications';

type NotificationOptions = Omit<NotificationData, 'message'>;

export function handleApiError(err: any) {
  if (!!err?.response) {
    let status: number | undefined = err.response.status;
    if (status === undefined) {
      showErrorNotification('An error occured');
      return;
    }

    let errorMessage = 'An error occured';

    if (status === 404) {
      errorMessage = 'Not found';
    } else if (status === 401) {
      errorMessage = 'You are not authorized to do that';
    }

    showErrorNotification(errorMessage);
  } else {
    showErrorNotification('An error occured');
  }
}

export function showNotification(notification: NotificationOptions) {
  notifications.show({
    title: notification.title,
    message: notification.message,
    color: notification.color,
    autoClose: notification.autoClose ?? 2000,
    ...notification,
  });
}

export function showSuccessNotification(message: string, options?: NotificationOptions) {
  showNotification({ title: 'Success', message, color: 'green', ...options });
}

export function showErrorNotification(message: string, options?: NotificationOptions) {
  showNotification({ title: 'Error', message, color: 'red', ...options });
}

export function showInfoNotification(message: string, options?: NotificationOptions) {
  showNotification({ title: 'Info', message, color: 'white', ...options });
}
