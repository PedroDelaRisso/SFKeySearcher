// deno-lint-ignore-file no-explicit-any
import { AxiosResponse } from "axios";
import _axios from './_axios.ts'

export class Api {
  public static get(url: string, payload: { params: any } = { params: {} }): Promise<AxiosResponse> {
    const config = {
      params: payload.params,
      paramsSerializer: (data: any) => String(data),
    };

    return new Promise<AxiosResponse>((resolve) => {
      resolve(_axios.get(`${url}`, config));
    });
  }

  public static authenticate(clientId: string, clientSecret: string, username: string, password: string) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    return new Promise<AxiosResponse>((resolve) => {
      resolve(_axios.post('api/v1/access_token', params, { auth: { username: clientId, password: clientSecret } })
          .then(response => {
            /// Please, **NEVER** store sensible data like this.
            sessionStorage.setItem('accessToken', response.data.access_token);
            return response.data.access_token;
          }));
    })
  }
}