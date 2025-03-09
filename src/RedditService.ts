// deno-lint-ignore-file no-explicit-any
import { AxiosError, AxiosResponse } from "axios";
import { Api } from "./Api.ts";
import { CommentWithKey } from "./@types/CommentWithKey.ts";
import moment from 'moment';

export class SoulFrameService {
  private static GetCommentsContainingKeys() {
    return new Promise<unknown>((resolve, reject) => {
      Api.get("r/SoulFrame/comments/1ih1iit/?sort=new")
        .then((response: AxiosResponse) => {
          resolve(response.data)
        })
        .catch((error: AxiosError) => reject(error));
    });
  }

  public static ApiLogin(clientId: string, clientSecret: string, username: string, password: string) {
    return new Promise<unknown>((resolve) => resolve(Api.authenticate(clientId, clientSecret, username, password)));
    
  }

  public static GetKeysInComments(lastDayFilter: boolean = true): Promise<CommentWithKey[]> {
    return new Promise<CommentWithKey[]>((resolve, reject) => {
      this.GetCommentsContainingKeys()
        .then((response) => {
          const regex = /\b([0-9A-Fa-f]{4}\b.*){2}/;
          console.log(response);
          let commentsContainingKeys = ((((response as any)[1].data.children as any[]).flatMap(({ data: { body_html, created_utc } }: any) => ({ body_html, created_utc })) as any[]).filter((item) => regex.test(item.body_html)))
            .flatMap((comment) => ({
              key: decodeURIComponent(comment.body_html),
              posted: moment(new Date(comment.created_utc * 1000).toISOString()).fromNow(),
            }));
          if (lastDayFilter) commentsContainingKeys = commentsContainingKeys
            .filter(({ posted }) => !(posted as string).includes('day') && !(posted as string).includes('week') && !(posted as string).includes('month')) as CommentWithKey[];
          resolve(commentsContainingKeys);
        })
        .catch(() => reject('Authentication error occurred'));
    })
  }
}
