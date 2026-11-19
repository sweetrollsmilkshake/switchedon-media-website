"""Check data/products.json before committing. Usage: python3 scripts/validate_products.py"""
import json, re, sys, datetime, os
REQ = ["id", "name", "category", "kit", "bestFor", "why", "source", "amazonQuery", "added"]
CATS = {"home-cinema", "smart-home", "gadgets"}
KITS = {"soundbar", "system", "stick", "box", "tvlight", "hub", "plug", "bulb", "lamp", "doorbell", "vacuum", "sunrise"}
d = json.load(open("data/products.json"))
errs = []
datetime.date.fromisoformat(d["updated"])
ids = set()
for i, p in enumerate(d["products"]):
    for k in REQ:
        if not p.get(k): errs.append(f"#{i} {p.get('id')}: missing {k}")
    if p.get("category") not in CATS: errs.append(f"{p.get('id')}: bad category {p.get('category')}")
    if p.get("kit") not in KITS: errs.append(f"{p.get('id')}: bad kit {p.get('kit')}")
    if p.get("id") in ids: errs.append(f"duplicate id {p.get('id')}")
    ids.add(p.get("id"))
    if not str(p.get("source", {}).get("url", "")).startswith("https://"): errs.append(f"{p.get('id')}: source url")
    if p.get("asin") and not re.fullmatch(r"[A-Z0-9]{10}", p["asin"]): errs.append(f"{p.get('id')}: bad asin")
    if re.search(r"£\s?\d", json.dumps(p)): errs.append(f"{p.get('id')}: contains a price")
    img = p.get("image")
    if img:
        if not (img.startswith("assets/products/") or img.startswith("https://")):
            errs.append(f"{p.get('id')}: image must be in assets/products/ or an https URL")
        elif img.startswith("assets/products/") and not os.path.exists(img):
            errs.append(f"{p.get('id')}: image file {img} not found")
        if re.search(r"media-amazon\.com|ssl-images-amazon\.com", img):
            errs.append(f"{p.get('id')}: Amazon image URLs must come from Amazon's API, not be pasted by hand")
if not 8 <= len(d["products"]) <= 30: errs.append(f"product count {len(d['products'])} outside 8-30")
print("\n".join(errs) or f"OK: {len(d['products'])} products")
sys.exit(1 if errs else 0)
