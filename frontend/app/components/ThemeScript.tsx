// Theme initialization script to prevent FOUC (Flash of Unstyled Content)
export function ThemeScript() {
  const scriptContent = `
    (function() {
      function getInitialTheme() {
        const persistedTheme = localStorage.getItem('theme');
        const hasPersistedTheme = typeof persistedTheme === 'string';
        
        if (hasPersistedTheme) {
          return persistedTheme;
        }
        
        const mediaQuery = '(prefers-color-scheme: dark)';
        const mql = window.matchMedia(mediaQuery);
        const hasMediaQueryPreference = typeof mql.matches === 'boolean';
        
        if (hasMediaQueryPreference) {
          return mql.matches ? 'dark' : 'light';
        }
        
        return 'light';
      }
      
      function setTheme(theme) {
        const resolvedTheme = theme === 'system' 
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme;
          
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolvedTheme);
        
        // Update meta theme-color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#09090b' : '#ffffff');
        }
      }
      
      const theme = getInitialTheme();
      setTheme(theme);
      
      // Make HTML visible after theme is set
      document.documentElement.style.visibility = 'visible';
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: scriptContent,
      }}
    />
  );
}
