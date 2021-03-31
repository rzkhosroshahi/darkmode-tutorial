const checkbox = document.getElementById('theme');
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getStoredTheme () {
    return window.localStorage.getItem('theme');
}

function getOsTheme () {
    return getComputedStyle(document.documentElement).getPropertyValue('--color-mode').replace(/\"/gi, '').trim();
}

function applySetting(state) {
    const storedTheme = getStoredTheme();
    const osTheme = getOsTheme();
    const preferedColor = state || osTheme;
    const fallBack = storedTheme || preferedColor;

    document.documentElement.dataset.userColorScheme = fallBack;
    checkbox.checked = fallBack === 'dark';
}

checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.documentElement.dataset.userColorScheme = 'dark';
        localStorage.setItem('theme', 'dark');
        return;
    }
    document.documentElement.dataset.userColorScheme = 'light';
    localStorage.setItem('theme', 'light');
});

darkQuery.addEventListener('change', (e) => {
    const currentTheme = e.target.matches ? 'dark' : 'light';
    applySetting(currentTheme);
});

applySetting();