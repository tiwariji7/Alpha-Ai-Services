import os
from PIL import Image

def optimize_images():
    src_dir = 'src/assets/images'
    pub_dir = 'public'
    os.makedirs(src_dir, exist_ok=True)
    os.makedirs(pub_dir, exist_ok=True)

    brand_path = os.path.join(src_dir, 'brandlogo.png')
    footer_path = os.path.join(src_dir, 'footerbrandlogo.png')

    if os.path.exists(brand_path):
        img = Image.open(brand_path)
        print(f"Original brand logo size: {img.size}")
        
        # 1. High-DPI 2x version (width ~320px)
        w2x = 320
        h2x = int(img.height * (w2x / img.width))
        img_2x = img.resize((w2x, h2x), Image.Resampling.LANCZOS)
        img_2x.save(os.path.join(src_dir, 'brandlogo.webp'), 'WEBP', quality=90, method=6)
        img_2x.save(os.path.join(pub_dir, 'brandlogo.webp'), 'WEBP', quality=90, method=6)
        img_2x.save(os.path.join(src_dir, 'brandlogo.png'), 'PNG', optimize=True)
        img_2x.save(os.path.join(pub_dir, 'brandlogo.png'), 'PNG', optimize=True)

        # 2. Favicon icons (32x32, 48x48, 180x180, 512x512)
        # Create a square crop/pad for favicon
        max_dim = max(img.width, img.height)
        sq_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
        offset = ((max_dim - img.width) // 2, (max_dim - img.height) // 2)
        sq_img.paste(img, offset)

        fav_180 = sq_img.resize((180, 180), Image.Resampling.LANCZOS)
        fav_180.save(os.path.join(pub_dir, 'apple-touch-icon.png'), 'PNG', optimize=True)

        fav_32 = sq_img.resize((32, 32), Image.Resampling.LANCZOS)
        fav_32.save(os.path.join(pub_dir, 'favicon-32x32.png'), 'PNG', optimize=True)

        fav_512 = sq_img.resize((512, 512), Image.Resampling.LANCZOS)
        fav_512.save(os.path.join(pub_dir, 'favicon.png'), 'PNG', optimize=True)

        # Multi-size ICO
        sq_img.save(os.path.join(pub_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])

        # Lightweight SVG favicon containing optimized base64
        import base64
        with open(os.path.join(pub_dir, 'favicon-32x32.png'), 'rb') as f:
            b64_fav = base64.b64encode(f.read()).decode('utf-8')
        
        svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <image href="data:image/png;base64,{b64_fav}" width="32" height="32" />
</svg>'''
        with open(os.path.join(pub_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
            f.write(svg_content)
        with open(os.path.join(src_dir, 'favicon.svg'), 'w', encoding='utf-8') as f:
            f.write(svg_content)

    if os.path.exists(footer_path):
        f_img = Image.open(footer_path)
        w2x = 320
        h2x = int(f_img.height * (w2x / f_img.width))
        f_img_2x = f_img.resize((w2x, h2x), Image.Resampling.LANCZOS)
        f_img_2x.save(os.path.join(src_dir, 'footerbrandlogo.webp'), 'WEBP', quality=90, method=6)
        f_img_2x.save(os.path.join(pub_dir, 'footerbrandlogo.webp'), 'WEBP', quality=90, method=6)
        f_img_2x.save(os.path.join(src_dir, 'footerbrandlogo.png'), 'PNG', optimize=True)

    print("Asset optimization complete!")

if __name__ == '__main__':
    optimize_images()
