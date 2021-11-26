import { API } from ".."
import store from "../../store"

const checkUser = async () => {
    try {
        const response = await API.get('/check-auth')

        if (response.status === 404) {
            return store.dispatch({
                type: "AUTH_ERROR",
            })
        }
        
        let payload = response.data.data.user
        
        payload.token = localStorage.token;

        store.dispatch({
            type: "USER_SUCCESS",
            payload,
          });
    } catch (error) {
        console.log(error)
    }
}

export { checkUser }