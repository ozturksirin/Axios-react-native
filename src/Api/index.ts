import axios, {AxiosRequestConfig, AxiosError} from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

type Response<D> = {
  statusCode: string | null;
  data: D | null;
};

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
};

async function GET<T>(
  url: string,
  params: Record<string, unknown>,
): Promise<Response<T>> {
  try {
    const controller = new AbortController();
    config.signal = controller.signal;
    config.params = params;
    const response = await axios.get<T>(`${BASE_URL}${url}`, config);
    return {
      statusCode: response.status.toString(),
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.error('GET', url, axiosError);
      return {
        statusCode: axiosError.response?.status.toString() || ('500' as string),
        data: null,
      };
    } else {
      console.error('GET', url, error);
      return {
        statusCode: '500' as string,
        data: null,
      };
    }
  }
}

export default {GET};
