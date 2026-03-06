"""
Generate public/og-image.png — 1200×630, Vision Coaching Institute branding.
Requires: pip install pillow
"""
import sys, os

try:
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
except ImportError:
    print("NEED_PILLOW")
    sys.exit(1)

OUT = r"C:\Users\lapto\GitHub\vision-coaching-institute\public\og-image.png"
LOGO = r"C:\Users\lapto\GitHub\vision-coaching-institute\public\logo.png"
W, H = 1200, 630

# ── Colours ──────────────────────────────────────────────────────────────────
DEEP_BLUE  = (5,  13,  31)    # #050D1F
MID_BLUE   = (10, 31,  92)    # #0A1F5C
GOLD       = (212, 160, 23)   # #D4A017
GOLD_LIGHT = (240, 200, 66)   # #F0C842
WHITE      = (255, 255, 255)
GRAY       = (180, 190, 210)

img  = Image.new("RGB", (W, H), DEEP_BLUE)
draw = ImageDraw.Draw(img)

# ── Background gradient (manual bands) ───────────────────────────────────────
for y in range(H):
    t = y / H
    r = int(DEEP_BLUE[0] + (MID_BLUE[0] - DEEP_BLUE[0]) * t * 0.6)
    g = int(DEEP_BLUE[1] + (MID_BLUE[1] - DEEP_BLUE[1]) * t * 0.6)
    b = int(DEEP_BLUE[2] + (MID_BLUE[2] - DEEP_BLUE[2]) * t * 0.6)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# ── Gold accent bar (top) ─────────────────────────────────────────────────────
draw.rectangle([(0, 0), (W, 5)], fill=GOLD)

# ── Gold accent bar (bottom) ──────────────────────────────────────────────────
draw.rectangle([(0, H-5), (W, H)], fill=GOLD)

# ── Diagonal accent lines (decorative) ───────────────────────────────────────
for i in range(6):
    x = -200 + i * 220
    draw.line([(x, 0), (x + 400, H)], fill=(212, 160, 23, 18), width=1)

# ── Logo ──────────────────────────────────────────────────────────────────────
LOGO_H = 110
try:
    logo = Image.open(LOGO).convert("RGBA")
    ratio = logo.width / logo.height
    logo = logo.resize((int(LOGO_H * ratio), LOGO_H), Image.LANCZOS)
    # Paste with alpha mask
    logo_x = 72
    logo_y = 72
    img.paste(logo, (logo_x, logo_y), logo)
    text_y_start = logo_y + LOGO_H + 24
except Exception as e:
    print(f"Logo load failed ({e}), skipping")
    text_y_start = 72

# ── Fonts (Windows system fonts, fallback to default) ────────────────────────
def load_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\Georgia.ttf" if not bold else r"C:\Windows\Fonts\Georgiab.ttf",
        r"C:\Windows\Fonts\calibri.ttf" if not bold else r"C:\Windows\Fonts\calibrib.ttf",
        r"C:\Windows\Fonts\arial.ttf"   if not bold else r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\segoeui.ttf" if not bold else r"C:\Windows\Fonts\segoeuib.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try: return ImageFont.truetype(path, size)
            except: continue
    return ImageFont.load_default()

font_institute = load_font(56, bold=True)
font_tagline   = load_font(30, bold=False)
font_badges    = load_font(22, bold=False)
font_sub       = load_font(24, bold=False)

# ── Institute name ────────────────────────────────────────────────────────────
NAME1 = "Vision Coaching Institute"
draw.text((72, text_y_start), NAME1, font=font_institute, fill=WHITE)

# ── Gold underline ────────────────────────────────────────────────────────────
bbox = draw.textbbox((72, text_y_start), NAME1, font=font_institute)
draw.rectangle([(72, bbox[3] + 6), (min(bbox[2], 900), bbox[3] + 10)], fill=GOLD)

y2 = bbox[3] + 22

# ── Location line ─────────────────────────────────────────────────────────────
draw.text((72, y2), "Purani Bazar, Tulsipur, Uttar Pradesh", font=font_tagline, fill=GRAY)
bbox2 = draw.textbbox((72, y2), "Purani Bazar, Tulsipur, Uttar Pradesh", font=font_tagline)
y3 = bbox2[3] + 22

# ── Tagline ───────────────────────────────────────────────────────────────────
draw.text((72, y3), "Expert Coaching · Classes 6–12 & BSc · CBSE · ISC · UP Board", font=font_sub, fill=GOLD_LIGHT)
bbox3 = draw.textbbox((72, y3), "Expert Coaching · Classes 6–12 & BSc · CBSE · ISC · UP Board", font=font_sub)
y4 = bbox3[3] + 36

# ── Stat pills ────────────────────────────────────────────────────────────────
PILLS = [
    ("500+ Students", GOLD),
    ("95% Pass Rate", (68, 200, 150)),
    ("Free Demo Class", (100, 160, 255)),
    ("+91 72104 33685", WHITE),
]

px = 72
for label, color in PILLS:
    bbox_p = draw.textbbox((0, 0), label, font=font_badges)
    pw = bbox_p[2] - bbox_p[0] + 28
    ph = bbox_p[3] - bbox_p[1] + 14
    # Pill background
    draw.rounded_rectangle([(px, y4), (px + pw, y4 + ph)], radius=ph//2,
                            fill=(255, 255, 255, 0), outline=color, width=2)
    draw.text((px + 14, y4 + 7), label, font=font_badges, fill=color)
    px += pw + 16

# ── Right panel — decorative circle ───────────────────────────────────────────
cx, cy, cr = 1010, 315, 190
for ring in range(4, 0, -1):
    alpha = 25 - ring * 4
    r_size = cr - ring * 30
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse([(cx - r_size, cy - r_size), (cx + r_size, cy + r_size)],
               outline=(*GOLD, alpha * 3), width=1)
    img = img.convert("RGBA")
    img = Image.alpha_composite(img, overlay)
    img = img.convert("RGB")
    draw = ImageDraw.Draw(img)

# ── Website URL (bottom right) ────────────────────────────────────────────────
url_font = load_font(20, bold=False)
url = "visioncoachinginstitute.online"
url_bbox = draw.textbbox((0, 0), url, font=url_font)
url_w = url_bbox[2] - url_bbox[0]
draw.text((W - url_w - 72, H - 42), url, font=url_font, fill=GRAY)

# ── Save ──────────────────────────────────────────────────────────────────────
img.save(OUT, "PNG", optimize=True)
print(f"SAVED: {OUT}  ({W}x{H})")
