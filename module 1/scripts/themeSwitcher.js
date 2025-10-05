
class ThemeManager {
    constructor() {
        this.theme = this.getSavedTheme();
        this.init();
    }

    getSavedTheme() {

        const saved = localStorage.getItem('theme');
        if (saved && (saved === 'dark' || saved === 'light')) {
            return saved;
        }
        

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        
        return 'dark';
    }

    init() {

        this.applyTheme(this.theme);
        this.setupEventListeners();
        

        setTimeout(() => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            if (currentTheme !== this.theme) {
                this.applyTheme(currentTheme);
            }
        }, 100);
    }

    applyTheme(theme) {
        console.log('Applying theme:', theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.theme = theme;
        this.updateToggleButton(theme);
    }

    updateToggleButton(theme) {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
            toggleBtn.setAttribute('data-current-theme', theme);
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        console.log('Toggling theme from', this.theme, 'to', newTheme);
        this.applyTheme(newTheme);
    }

    setupEventListeners() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }


        window.addEventListener('storage', (e) => {
            if (e.key === 'theme' && e.newValue) {
                console.log('Storage event: theme changed to', e.newValue);
                this.applyTheme(e.newValue);
            }
        });
    }
}


function initializeTheme() {

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    

    window.themeManager = new ThemeManager();
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}


setTimeout(initializeTheme, 50);