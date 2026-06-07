function applyThemeByTime() {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    document.body.classList.remove("dark-mode", "light-mode");
    document.body.classList.add(isNight ? "dark-mode" : "light-mode");
}

applyThemeByTime();
setInterval(applyThemeByTime, 60000);