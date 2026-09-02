import os
from PIL import Image
import numpy as np

def create_white_s_footer_logo():
    src_dir = 'src/assets/images'
    pub_dir = 'public'

    input_logo_path = os.path.join(src_dir, 'brandlogo.png')
    if not os.path.exists(input_logo_path):
        print(f"Error: {input_logo_path} does not exist!", flush=True)
        return

    # Load source image
    raw_img = Image.open(input_logo_path).convert("RGBA")
    arr = np.array(raw_img).astype(float)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

    # Calculate membership in 'A' (the blue/violet gradient mark)
    # The 'A' has distinct high blue channel and saturation compared to red/green
    score_a = np.clip(
        ((b - 120.0) / 45.0) * np.clip((b - np.maximum(r, g) - 15.0) / 40.0, 0.0, 1.0),
        0.0,
        1.0
    )

    # Pure white for 'S' [255, 255, 255]
    white = np.ones_like(arr[:,:,:3]) * 255.0

    # Smooth blend between 'A' (original vibrant blue-violet gradient) and 'S' (pure white)
    final_rgb = score_a[:,:,None] * arr[:,:,:3] + (1.0 - score_a[:,:,None]) * white

    # Preserve exact alpha transparency
    final_rgba = np.dstack([final_rgb, a])
    out_img = Image.fromarray(np.clip(final_rgba, 0, 255).astype(np.uint8))

    # Save to src/assets/images and public
    for target_dir in [src_dir, pub_dir]:
        out_img.save(os.path.join(target_dir, 'footerbrandlogo.png'), 'PNG', optimize=True)
        out_img.save(os.path.join(target_dir, 'footerbrandlogo.webp'), 'WEBP', quality=95)

    print("Successfully created and saved footerbrandlogo.png and footerbrandlogo.webp with White 'S'!", flush=True)

if __name__ == '__main__':
    create_white_s_footer_logo()
