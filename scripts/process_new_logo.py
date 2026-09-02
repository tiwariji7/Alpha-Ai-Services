import os
import io
import base64
from PIL import Image

def process_brand_assets():
    src_dir = 'src/assets/images'
    pub_dir = 'public'
    os.makedirs(src_dir, exist_ok=True)
    os.makedirs(pub_dir, exist_ok=True)

    input_logo_path = os.path.join(src_dir, 'brandlogo.png')
    if not os.path.exists(input_logo_path):
        print(f"Error: {input_logo_path} does not exist!", flush=True)
        return

    # Load source image
    raw_img = Image.open(input_logo_path).convert("RGBA")
    print(f"Loaded logo with size: {raw_img.size}", flush=True)

    # Tight crop to remove empty transparent space
    bbox = raw_img.getbbox()
    if bbox:
        img = raw_img.crop(bbox)
    else:
        img = raw_img
    print(f"Cropped to: {img.size}", flush=True)

    # 1. High-DPI Header & Footer Logos (width 480px)
    w_target = 480
    h_target = int(img.height * (w_target / img.width))
    logo_hires = img.resize((w_target, h_target), Image.Resampling.LANCZOS)

    for out_dir in [src_dir, pub_dir]:
        logo_hires.save(os.path.join(out_dir, 'brandlogo.png'), 'PNG', optimize=True)
        logo_hires.save(os.path.join(out_dir, 'brandlogo.webp'), 'WEBP', quality=95)
        logo_hires.save(os.path.join(out_dir, 'footerbrandlogo.png'), 'PNG', optimize=True)
        logo_hires.save(os.path.join(out_dir, 'footerbrandlogo.webp'), 'WEBP', quality=95)

    print("Saved header and footer brand logo files (PNG & WebP)", flush=True)

    # 2. Favicons (Square canvas with optimal optical balance)
    max_dim = max(img.width, img.height)
    pad = int(max_dim * 0.05)
    sq_size = max_dim + (pad * 2)

    sq_img = Image.new("RGBA", (sq_size, sq_size), (0, 0, 0, 0))
    offset_x = (sq_size - img.width) // 2
    offset_y = (sq_size - img.height) // 2
    sq_img.paste(img, (offset_x, offset_y), img)

    # 512x512
    fav_512 = sq_img.resize((512, 512), Image.Resampling.LANCZOS)
    fav_512.save(os.path.join(pub_dir, 'favicon.png'), 'PNG', optimize=True)

    # 180x180 (Apple Touch Icon)
    fav_180 = sq_img.resize((180, 180), Image.Resampling.LANCZOS)
    fav_180.save(os.path.join(pub_dir, 'apple-touch-icon.png'), 'PNG', optimize=True)

    # 32x32 Favicon PNG
    fav_32 = sq_img.resize((32, 32), Image.Resampling.LANCZOS)
    fav_32.save(os.path.join(pub_dir, 'favicon-32x32.png'), 'PNG', optimize=True)

    # Favicon ICO with 16, 32, 48 embedded sizes
    fav_512.save(os.path.join(pub_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

    # SVG Favicon with high-res embedded image
    buf = io.BytesIO()
    fav_180.save(buf, format='PNG', optimize=True)
    b64_str = base64.b64encode(buf.getvalue()).decode('utf-8')

    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <image href="data:image/png;base64,{b64_str}" width="180" height="180" />
</svg>'''

    with open(os.path.join(pub_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    with open(os.path.join(src_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)

    print("All favicon and brand logo assets generated successfully!", flush=True)

if __name__ == '__main__':
    process_brand_assets()
