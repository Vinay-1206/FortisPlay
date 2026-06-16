from PIL import Image, ImageDraw
import os

OUT = "public/icons"
os.makedirs(OUT, exist_ok=True)

BLUE = (37, 99, 255, 255)
WHITE = (255, 255, 255, 255)

def draw_icon(size, maskable=False):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        # full bleed background, no rounded corners (safe-zone handled by OS)
        d.rectangle([0, 0, size, size], fill=BLUE)
        scale = 0.62
    else:
        radius = size * 0.19
        d.rounded_rectangle([0, 0, size, size], radius=radius, fill=BLUE)
        scale = 0.74

    cx, cy = size / 2, size / 2
    s = size * scale / 2

    # Hexagon outline
    import math
    pts = []
    for i in range(6):
        angle = math.pi / 2 + i * math.pi / 3
        pts.append((cx + s * math.cos(angle), cy - s * math.sin(angle)))
    width = max(2, int(size * 0.045))
    d.polygon(pts, outline=WHITE, width=width)

    # "F" glyph
    fs = s * 0.85
    x0, y0 = cx - fs * 0.55, cy - fs * 0.6
    bar_w = max(2, int(size * 0.05))
    d.line([(x0, y0), (x0 + fs * 0.9, y0)], fill=WHITE, width=bar_w)
    d.line([(x0, y0), (x0, y0 + fs * 1.2)], fill=WHITE, width=bar_w)
    d.line([(x0, y0 + fs * 0.55), (x0 + fs * 0.65, y0 + fs * 0.55)], fill=WHITE, width=bar_w)

    return img

sizes = [72, 96, 128, 144, 192, 256, 384, 512]
for sz in sizes:
    draw_icon(sz).save(f"{OUT}/icon-{sz}.png")

draw_icon(512, maskable=True).save(f"{OUT}/icon-512-maskable.png")

# favicon
fav = draw_icon(64)
fav.save("public/favicon.png")
fav.save("public/favicon.ico", format="ICO", sizes=[(32, 32), (16, 16)])

# apple touch icon
draw_icon(180).save("public/icons/apple-touch-icon.png")

print("done")
