class ThemeManager {
    constructor() {
        this.theme = this.getSavedTheme();
        this.applyTheme(this.theme);
        this.setupEventListeners();
    }

    getSavedTheme() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light') {
            return saved;
        }
        
        return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        this.updateToggleButton();
    }

    updateToggleButton() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = this.theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
        }
    }

    toggleTheme() {
        this.applyTheme(this.theme === 'dark' ? 'light' : 'dark');
    }

    setupEventListeners() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
        
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme' && e.newValue) {
                this.applyTheme(e.newValue);
            }
        });
     
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) { 
                this.applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});