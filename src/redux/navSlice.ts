import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Langs {
  [key: string]: number
}

interface NavLink {
  link: string
  title: string[]
}

export type NavigationState = {
  langs: Langs
  currentLang: number
  title: string
  navBar: NavLink[]
}

let initialState: NavigationState = {
  langs: { ru: 0, en: 1 },
  currentLang: 0,
  title: '',
  navBar: [
    { link: '/', title: ['Начало', 'Start'] },
    { link: '/settings', title: ['Настройки', 'Settings'] },
    { link: '/commodity', title: ['Товары', 'Products'] },
    { link: '/documents', title: ['Документы', 'Documents'] },
    { link: '/docs', title: ['Первичка', 'Invoice'] },
    { link: '/game', title: ['Играть', 'Game'] },
    { link: '/table', title: ['Экспорт Excel', 'Export Excel'] },
  ],
};

const navSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    getTitleAC(state, action: PayloadAction<string>) {
      let title;
      let nav = state.navBar.find((item) => item.link === action.payload);
      if (nav !== undefined) {
        title = nav.title[state.currentLang];
      }
      state.title = title || 'No Title';
    },
    chooseLangAC(state, action: PayloadAction<string>) {
      state.currentLang = state.langs[action.payload]
    }
  }
})

export const { getTitleAC, chooseLangAC } = navSlice.actions;

export default navSlice;
