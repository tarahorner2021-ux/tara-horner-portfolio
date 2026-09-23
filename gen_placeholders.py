from PIL import Image, ImageDraw, ImageFont
import os, random

OUT = "assets"
os.makedirs(OUT, exist_ok=True)

PALETTE = [
    ("#35435D", "#FFFCF2"),
    ("#E4C577", "#35435D"),
    ("#8C7D6B", "#FFFCF2"),
    ("#EDE6D8", "#35435D"),
    ("#605A53", "#FFFCF2"),
    ("#C9A26A", "#FFFCF2"),
    ("#9AA9C4", "#35435D"),
]

def font(size):
    for path in [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def make(name, w, h, label, seed):
    random.seed(seed)
    bg, fg = PALETTE[seed % len(PALETTE)]
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)

    # subtle diagonal texture
    step = max(18, w // 18)
    for x in range(-h, w, step):
        draw.line([(x, 0), (x + h, h)], fill=fg, width=1)
    overlay = Image.new("RGB", (w, h), bg)
    img = Image.blend(img, overlay, 0.86)
    draw = ImageDraw.Draw(img)

    f = font(max(14, min(w, h) // 12))
    bbox = draw.textbbox((0, 0), label, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, (h - th) / 2 - bbox[1]), label, font=f, fill=fg)

    img.save(os.path.join(OUT, name), quality=87)
    print(name, w, h)

# Hero collage photos (7)
collage_sizes = [
    ("collage-1.jpg", 480, 270),
    ("collage-2.jpg", 356, 296),
    ("collage-3.jpg", 280, 592),
    ("collage-4.jpg", 608, 318),
    ("collage-5.jpg", 406, 150),
    ("collage-6.jpg", 482, 172),
    ("collage-7.jpg", 592, 220),
]
for i, (name, w, h) in enumerate(collage_sizes):
    make(name, w, h, f"Work {i+1}", i)

# Case study featured image
make("case-featured.jpg", 1073, 666, "Homepage Revamp", 10)

# Case study thumbnails
for i in range(1, 6):
    make(f"case-{i}.jpg", 772, 506, f"Case Study {i}", 20 + i)

# AI logo (square-ish mark)
img = Image.new("RGB", (280, 280), "#706CFF")
d = ImageDraw.Draw(img)
d.ellipse([40, 40, 240, 240], fill="#FFFCF2")
d.ellipse([90, 90, 190, 190], fill="#706CFF")
img.save(os.path.join(OUT, "ai-logo.png"))
print("ai-logo.png")

# Portrait
make("portrait.jpg", 552, 472, "Tara Horner", 30)

print("done")
