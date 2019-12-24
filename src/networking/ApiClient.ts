import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import sharedConfig from "../utils/config";
import normalize from "../utils/normalize";

class ApiClient {
  private sharedAxios: AxiosInstance;

  public constructor() {
    this.sharedAxios = axios.create({
      baseURL: sharedConfig.apiURL
    });

    this.sharedAxios.interceptors.request.use(
      async (config): Promise<AxiosRequestConfig> => {
        const url = config.url?.toString() ?? '';
        let nextConfig = config;
        if (url.startsWith(sharedConfig.apiURL)) {
          // const { account } = configuredStore.store.getState();
          nextConfig = Object.assign({}, config, {
            data: normalize("snakecase", config.data)
          });

          // if (account && account.isLoggedIn) {
          //   const { accessToken = '' } = account.jwtToken || {};
          //   nextConfig.headers.Authorization = `Bearer ${accessToken}`;
          // }
        }
        return nextConfig;
      }
    );
    this.sharedAxios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        const url = response.request.url?.toString() ?? '';
        let nextResponse = response;
        if (url.startsWith(sharedConfig.apiURL)) {
          nextResponse = Object.assign({}, response, {
            data: normalize("camelcase", response.data)
          });
        }
        return nextResponse;
      },
      (error): any => {
        const { response: { data } = { data: undefined } } = error;
        if (data) {
          if (data.errors && data.errors.length > 0) {
            error.message = data.errors[0].message;
          } else if (data.message) {
            error.message = data.message;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
    runInBackground = true,
  ): Promise<R> {
    if (!runInBackground) {
      return this.sharedAxios.request(config);
    }

    return new Promise<R>((resolve, reject) => {
      const message = { method: 'request', arguments: config }
      const responseCallback = ({ response, error }: any) => {
        if (response) resolve(response);
        if (error) reject(error);
      }
      chrome.runtime.sendMessage(message, responseCallback);
    });
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request({
      method: "GET",
      url,
      ...config
    });
  }

  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      method: "DELETE",
      url,
      ...config
    });
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request({
      method: "POST",
      url,
      data,
      ...config
    });
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request({
      method: "PUT",
      url,
      data,
      ...config
    });
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request({
      method: "PATCH",
      url,
      data,
      ...config
    });
  }
}

export default ApiClient;
