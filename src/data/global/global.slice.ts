import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EXPANDED_CONTENT_TYPE } from "../../types/side-bar.type";
import { UserInfo } from "../../types/users.type";

export type GlobalState = {
  userInfo: UserInfo;
  sideBarExpandedContent: EXPANDED_CONTENT_TYPE | null;
  addPostModalOpen: boolean;
};

const initialState: GlobalState = {
  userInfo: {
    userId: "1",
    displayName: "Thanh Tuan",
    username: "thanhpt1110",
    avatarUrl:
      "https://i.pinimg.com/736x/5d/c5/62/5dc562fd84db2353f567799f1e5502b1.jpg",
  },
  sideBarExpandedContent: null,
  addPostModalOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setSideBarExpandedContent: (
      state,
      action: PayloadAction<EXPANDED_CONTENT_TYPE | null>
    ) => {
      state.sideBarExpandedContent = action.payload;
    },
    setAddPostModalOpen: (state, action: PayloadAction<boolean>) => {
      state.addPostModalOpen = action.payload;
    },
  },
});

export const { setUserInfo, setSideBarExpandedContent, setAddPostModalOpen } =
  globalSlice.actions;

export default globalSlice.reducer;
