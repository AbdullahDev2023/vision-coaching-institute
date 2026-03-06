"""
fix_logos.py - Autocrop logo images to remove blank/black space below.
Handles both transparent-bg and solid-black-bg images.
"""

from PIL import Image, ImageChops, ImageFilter
import os, re

PUBLIC = r"C:\Users\lapto\GitHub\vision-coaching-institute\public"

def get_tight_bbox(img):
    """Return bounding box of logo content, handling both transparent and black backgrounds."""
    rgba = img.convert("RGBA")
    r, g, b, a = rgba.split()

    # Check if image has meaningful alpha channel (transparent bg)
    alpha_vals = list(a.getdata())
    has_alpha = any(v < 200 for v in alpha_vals)

    if has_alpha:
        # Use alpha channel — transparent areas are background
        mask = a.point(lambda x: 255 if x > 30 else 0)
    else:
        # Solid background: detect non-background pixels using brightness
        # Background color = sample from corners
        corners = [rgba.getpixel((0,0)), rgba.getpixel((img.width-1, 0)),
                   rgba.getpixel((0, img.height-1)), rgba.getpixel((img.width-1, img.height-1))]
        # Average bg color
        bg_r = sum(c[0] for c in corners) // 4
        bg_g = sum(c[1] for c in corners) // 4
        bg_b = sum(c[2] for c in corners) // 4

        # Create mask: pixels that differ enough from background
        def is_content(px):
            diff = abs(px[0]-bg_r) + abs(px[1]-bg_g) + abs(px[2]-bg_b)
            return 255 if diff > 30 else 0

        mask = Image.new("L", rgba.size)
        mask.putdata([is_content(px) for px in rgba.getdata()])
        # Small blur to clean up noise
        mask = mask.filter(ImageFilter.MaxFilter(5))

    bbox = mask.getbbox()
    return bbox

def make_square(bbox, orig_size=None):
    x0, y0, x1, y1 = bbox
    w, h = x1-x0, y1-y0
    side = max(w, h)
    cx, cy = (x0+x1)//2, (y0+y1)//2
    half = side//2
    sq = (cx-half, cy-half, cx+half, cy+half)
    # Clamp
    if orig_size:
        W, H = orig_size
        sq = (max(0,sq[0]), max(0,sq[1]), min(W,sq[2]), min(H,sq[3]))
    return sq

def crop_image(src_path, dst_path=None):
    dst_path = dst_path or src_path
    img = Image.open(src_path)
    orig = img.size
    bbox = get_tight_bbox(img)
    if not bbox:
        print(f"  Skipped (empty): {os.path.basename(src_path)}")
        return
    sq = make_square(bbox, img.size)
    cropped = img.crop(sq)
    # Resize to a clean power-of-2 or original dimension if small
    target = orig[0]  # keep same canvas size (or you can skip resize)
    cropped_sq = cropped.resize((target, target), Image.LANCZOS)

    if dst_path.endswith(".webp"):
        cropped_sq.save(dst_path, "WEBP", quality=95)
    elif dst_path.endswith(".ico"):
        sizes = [(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)]
        imgs = [cropped_sq.resize(s, Image.LANCZOS) for s in sizes]
        imgs[0].save(dst_path, format="ICO", sizes=sizes, append_images=imgs[1:])
    else:
        cropped_sq.save(dst_path, "PNG")

    print(f"  {os.path.basename(src_path)}: {orig} -> cropped at {sq} -> saved {target}x{target}")

def crop_svg_by_ratio(svg_path, ratio_y0, ratio_y1):
    """Adjust SVG viewBox vertically based on crop ratio."""
    with open(svg_path, "r", encoding="utf-8") as f:
        content = f.read()

    vb_match = re.search(r'viewBox=["\']([^"\']+)["\']', content)
    if vb_match:
        parts = vb_match.group(1).split()
        if len(parts) == 4:
            vx, vy, vw, vh = [float(p) for p in parts]
            new_vy = vy + vh * ratio_y0
            new_vh = vh * (ratio_y1 - ratio_y0)
            # Make square
            cx = vx + vw/2
            side = min(vw, new_vh)
            new_vb = f"{cx-side/2:.2f} {new_vy:.2f} {side:.2f} {side:.2f}"
            content = re.sub(r'viewBox=["\'][^"\']+["\']', f'viewBox="{new_vb}"', content)
            # Update width/height
            content = re.sub(r'(?<!\w)width=["\'][^"\']+["\']', f'width="{side:.0f}"', content, count=1)
            content = re.sub(r'(?<!\w)height=["\'][^"\']+["\']', f'height="{side:.0f}"', content, count=1)
            with open(svg_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  logo.svg: viewBox -> {new_vb}")
        return
    print("  logo.svg: no viewBox found, skipping")

# ── Get crop ratio from logo.png ────────────────────────────────────────────
print("Analyzing logo.png for crop bounds...")
ref = os.path.join(PUBLIC, "logo.png")
img_ref = Image.open(ref)
bbox = get_tight_bbox(img_ref)
sq = make_square(bbox, img_ref.size)
W, H = img_ref.size
ratio_y0 = sq[1] / H
ratio_y1 = sq[3] / H
print(f"  Logo content square: {sq} in {W}x{H}")
print(f"  Y ratio: {ratio_y0:.3f} to {ratio_y1:.3f}")

# ── Process all logo files ───────────────────────────────────────────────────
print("\nProcessing PNG/WEBP logos...")
for name in ["logo.png", "logo-opt.png", "logo.webp"]:
    p = os.path.join(PUBLIC, name)
    if os.path.exists(p): crop_image(p)

print("\nProcessing favicon PNGs...")
for name in ["favicon_16.png","favicon_32.png","favicon_48.png","favicon_180.png"]:
    p = os.path.join(PUBLIC, name)
    if os.path.exists(p): crop_image(p)

print("\nProcessing favicon.ico...")
ico_path = os.path.join(PUBLIC, "favicon.ico")
if os.path.exists(ico_path):
    crop_image(ico_path)

print("\nProcessing logo.svg...")
svg_path = os.path.join(PUBLIC, "logo.svg")
if os.path.exists(svg_path):
    crop_svg_by_ratio(svg_path, ratio_y0, ratio_y1)

print("\nDone!")
