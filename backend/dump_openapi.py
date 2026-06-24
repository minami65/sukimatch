# 📄 backend/dump_openapi.py
import json
import os
from app.main import app

# backendの直下に openapi.json という名前で保存する
current_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(current_dir, "openapi.json")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(app.openapi(), f, indent=2, ensure_ascii=False)

print("✅ backend/openapi.json を書き出しました！")