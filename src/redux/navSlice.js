import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  langs: { ru: 0, en: 1 },
  currentLang: 0,
  title: '',
  navBar: [
    { link: '/', title: ['Начало', 'Start'] },
    { link: '/settings', title: ['Настройки', 'Settings'] },
    { link: '/commodity', title: ['Товары', 'Products'] },
    { link: '/documents', title: ['Документы', 'Documents'] },
    { link: '/game', title: ['Играть', 'Game'] },
    { link: '/table', title: ['Экспорт Excel', 'Export Excel'] },
  ],
};

const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    getTitleAC(state, action) {
      let title;
      let nav = state.navBar.find((item) => item.link === action.payload);
      if (nav !== undefined) {
        title = nav.title[state.currentLang];
      }
      state.title = title;
    },
    chooseLangAC(state, action) {
      state.currentLang = state.langs[action.payload]
    }
  }
})

export const { getTitleAC, chooseLangAC } = navSlice.actions;

export default navSlice;
