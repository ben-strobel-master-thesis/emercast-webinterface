import { Configuration, DefaultApi } from '@/lib/api';

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export let api = new DefaultApi(new Configuration({ basePath: baseUrl }));

export function setApiToken(token: string | null) {
  if (token !== null) {
    api = new DefaultApi(
      new Configuration({
        basePath: baseUrl,
        accessToken: token,
      })
    );
  } else {
    api = new DefaultApi(new Configuration({ basePath: baseUrl }));
  }
}
