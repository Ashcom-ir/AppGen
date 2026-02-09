# template.py
import tkinter as tk
import sys

LIGHT = "{LIGHT}"
DARK  = "{DARK}"

# تابع برای تشخیص تم ویندوز
def get_windows_theme():
    try:
        import winreg
        registry = winreg.ConnectRegistry(None, winreg.HKEY_CURRENT_USER)
        key_path = r'SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize'
        key = winreg.OpenKey(registry, key_path)
        # AppsUseLightTheme = 1 یعنی light، 0 یعنی dark
        value, _ = winreg.QueryValueEx(key, "AppsUseLightTheme")
        return "light" if value == 1 else "dark"
    except Exception:
        return "light"  # fallback

def main():
    theme = get_windows_theme()
    bg_color = LIGHT if theme == "light" else DARK

    root = tk.Tk()
    root.title("AppGen EXE")
    root.geometry("800x600")
    root.configure(bg=bg_color)

    tk.Label(root, text="AppGen", bg=bg_color, fg="white", font=("Arial", 16)).pack(expand=True)

    root.mainloop()

if __name__ == "__main__":
    main()


