import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../types/User";
import { NewUser } from "../../types/NewUser";
import { UserCredential } from "../../types/UserCredential";

const initialState: {
    users: User[],
    currentUser?: User | null,
    error: string,
    loading: boolean
} = {
    users: [],
    currentUser: null,
    error: '',
    loading: false
}

export const fetchAllUsers = createAsyncThunk(
    'fetchAllUsers',
    async () => {
        try {
            const response = await axios.get<User[]>('https://api.escuelajs.co/api/v1/users');
            // console.log('fetchAllUsers run');
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const createNewUser = createAsyncThunk(
    'createNewUser',
    async (user: NewUser) => {
        try {
            const response = await axios.post<User>('https://api.escuelajs.co/api/v1/users/', user);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            if (error.response) {
                return JSON.stringify(error.response.data);
            }
            return error;
        }
    }
)

// export const checkEmail = createAsyncThunk(
//     'checkEmail',
//     async (email: string) => {
//         try {
//             const response = await axios.post('https://api.escuelajs.co/api/v1/users/is-available', email);
//             return response.data;
//         } catch (e) {
//             const error = e as AxiosError;
//             if (error.response) {
//                 return JSON.stringify(error.response.data);
//             }
//             return error;
//         }
//     }
// )

const updateUser = createAsyncThunk(
    'updateUser',
    async(user: User) => {
        try {
            const response = await axios.put<User>('https://api.escuelajs.co/api/v1/users/1', user);
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const authenticate = createAsyncThunk(
    'authenticate',
    async(access_token: string) => {
        try {
            const response = await axios.get<User>('https://api.escuelajs.co/api/v1/auth/profile', {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
            return response.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

export const login = createAsyncThunk(
    'login',
    async({ email, password } : UserCredential, { dispatch }) => {
        try {
            const response = await axios.post<{ access_token: string }>('https://api.escuelajs.co/api/v1/auth/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            console.log(response.data.access_token);
            const authentication = await dispatch(authenticate(response.data.access_token));
            return authentication.payload as User;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        } 
    },
    extraReducers: (build) => {
        build.addCase(fetchAllUsers.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
                return
            } else {
                state.users = action.payload;
            }
            state.loading = false;
        })
        .addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.error = 'can not fetch all users';
            state.loading = false;
        })
        .addCase(createNewUser.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else if (typeof action.payload === 'string') {
                state.error = action.payload;
            } else {
                state.users.push(action.payload);
                // console.log('new user created');
            }
            state.loading = false;
        })
        .addCase(createNewUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(createNewUser.rejected, (state, action) => {
            state.error = 'can not create new user';
            state.loading = false;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message;
            } else {
                state.currentUser = action.payload;
            }
            state.loading = false;
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.rejected, (state) => {
            state.error = 'can not update user';
        })
        .addCase(authenticate.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError)
            {
                // state.error = action.payload.message;
                state.error = "Authentication failed, user is not registerd";
            } else {
                state.currentUser = action.payload;
            } 
        })
        .addCase(authenticate.pending, (state) => {
            state.loading = true;
        })
        .addCase(authenticate.rejected, (state, action) => {
            state.error = 'Authenticate failed';
        })
        .addCase(login.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                // state.error = action.payload.message;
                state.error = action.payload.request.statusText + " or Wrong password!";
            } else {
                state.currentUser = action.payload;
                state.error = '';
                localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
                // console.log('log in successfully');
            }
            state.loading = false;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
        })
        .addCase(login.rejected, (state) => {
            state.error = 'Log in failed';
            state.currentUser = null;
        })
    }
})

export const { logOut } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;