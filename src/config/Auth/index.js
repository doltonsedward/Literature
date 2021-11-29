import { API } from ".."
import store from "../../store"

const checkUser = async () => {
    try {
        const response = await API.get('/check-auth')

        if (response.status !== 200) {
            store.dispatch({
                type: "AUTH_ERROR",
            })
        }
        
        let payload = response.data.data.user
        
        payload.token = localStorage.token;

        store.dispatch({
            type: "AUTH_SUCCESS",
            payload,
          });
    } catch (error) {
        const times = Math.floor(Math.random() * 4000 + 100)
        setTimeout(() => {
            store.dispatch({
                type: "AUTH_ERROR",
            })
        }, times);
    }
}

export { checkUser }