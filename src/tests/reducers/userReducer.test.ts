import { createNewUser } from "../../redux/reducers/userReducer"
import store from "../../redux/store"
import { user1 } from "../data/users"

describe('Testing userReducer', () => {
    test('Check initialState', () => {
        expect(store.getState().userReducer).toEqual({
            users: [],
            currentUser: null,
            error: '',
            loading: false
        })
    })
    test('Check if new user is created using createNewUser', async () => {
      await store.dispatch(createNewUser(user1));
      expect(store.getState().userReducer.users.length).toBe(1);
    })
})