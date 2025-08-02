import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types";
import type { RootState } from "@/store/store";

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    toggleUserActive(state, action: PayloadAction<number>) {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.active = !user.active;
      }
    },
  },
});

export const { setUsers, addUser, updateUser, toggleUserActive } =
  userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;

export default userSlice.reducer;
