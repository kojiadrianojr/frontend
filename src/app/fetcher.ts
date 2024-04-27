import wretch, {Wretch, WretchError} from "wretch";
import { AuthActions } from "./auth/utils";
import { API_URL } from "./config";

const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
  return (
    wretch(API_URL)
    .auth(`Bearer ${getToken("access")}`)
    .catcher(401, async(error: WretchError, request: Wretch) => {
      try {
        // Refresh the JWT token
        const { access } = (await handleJWTRefresh().json()) as {access: string}

        // Store the access token
        storeToken(access, "access");

        return request
        .auth(`Bearer ${access}`)
        .fetch()
        .unauthorized(() => {
          window.location.replace("/");
        })
        .json();
      } catch (e) {
        window.location.replace("/");
      }
    })
  )
}

export const fetcher = (url:string):Promise<any> => {
  return api().get(url).json();
};