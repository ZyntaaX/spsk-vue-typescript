import { defineStore } from "pinia";

export type Theme = 'LIGHT' | 'DARK' | 'SYSTEM_DEFAULT';

export const LOCALSTORAGE_VAR = 'SELECTED_THEME';

const THEME_STORE_ID = 'STORE:THEME';
export const useThemeStore = defineStore(THEME_STORE_ID, {
    state: (): ThemeState => ({
        currentTheme: localStorage.getItem(LOCALSTORAGE_VAR) as Theme ?? 'SYSTEM_DEFAULT',
    }),
    actions: {
        setInitialTheme() {
            setDataTheme(this.currentTheme)
        },
        setCurrentTheme(theme: Theme) {
            console.log("GOT THEME: ", theme);
            this.currentTheme = theme
            setDataTheme(theme)
        }
    },
    getters: {
        getCurrentTheme() : Theme {
            const systemDefaultIsDark = window?.matchMedia("(prefers-color-scheme: dark)")?.matches ?? false
            return this.currentTheme; // === 'SYSTEM_DEFAULT' ? systemDefaultIsDark ? 'DARK' : 'LIGHT' : this.currentTheme
        }
    },
});

function setDataTheme(theme: Theme) {
    const systemDefaultIsDark = window?.matchMedia("(prefers-color-scheme: dark)")?.matches ?? false
    let themeToSet: Theme = theme;

    localStorage.setItem(LOCALSTORAGE_VAR, theme)

    if (theme === 'SYSTEM_DEFAULT') {
        themeToSet = systemDefaultIsDark ? 'DARK' : 'LIGHT';
    }

    const app = document.getElementById('app');
    app?.removeAttribute('data-theme');
    app?.setAttribute('data-theme', `CUSTOM-THEME-${themeToSet}`);
}

type ThemeState = {
    currentTheme: Theme;
}