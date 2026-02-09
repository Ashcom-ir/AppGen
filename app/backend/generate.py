# generate.py
import os
import sys

if len(sys.argv) < 3:
    print("Usage: python generate.py <light_color> <dark_color>")
    sys.exit(1)

light = sys.argv[1]
dark  = sys.argv[2]

script_dir = os.path.dirname(os.path.abspath(__file__))
template_path = os.path.join(script_dir, "template.py")

# خواندن قالب
with open(template_path, "r", encoding="utf-8") as f:
    code = f.read()

# جایگزینی رنگ‌ها
code = code.replace("{LIGHT}", light).replace("{DARK}", dark)

# ساخت build.py
build_path = os.path.join(script_dir, "build.py")
with open(build_path, "w", encoding="utf-8") as f:
    f.write(code)

print("build.py created.")

# پوشه dist را مشخص می‌کنیم تا مسیر ثابت باشد
dist_dir = os.path.join(script_dir, "dist")
os.makedirs(dist_dir, exist_ok=True)

# ساخت EXE با PyInstaller و مسیر مشخص dist
os.system(f'python -m PyInstaller --onefile --noconsole --distpath "{dist_dir}" "{build_path}"')

exe_file = os.path.join(dist_dir, "build.exe")
if os.path.exists(exe_file):
    print(exe_file)  # مسیر دقیق exe را چاپ می‌کنیم
else:
    print("ERROR: build.exe not found!")
