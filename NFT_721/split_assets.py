from PIL import Image
import os

# Đường dẫn đến file ảnh rồng phương đông bạn đã lưu
input_image_path = "dragon_models.png" 
output_dir = "layers_extracted"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def split_image(image_path, rows, cols):
    img = Image.open(image_path)
    width, height = img.size
    
    # Tính kích thước mỗi ô
    cell_width = width // cols
    cell_height = height // rows
    
    count = 1
    for r in range(rows):
        for c in range(cols):
            # Tính toán tọa độ cắt (left, upper, right, lower)
            left = c * cell_width
            upper = r * cell_height
            right = left + cell_width
            bottom = upper + cell_height
            
            # Cắt và lưu
            box = (left, upper, right, bottom)
            chip = img.crop(box)
            chip.save(os.path.join(output_dir, f"dragon_variant_{count}.png"))
            print(f"Đã lưu variant {count}")
            count += 1

# Chạy lệnh cắt: 2 hàng, 2 cột
split_image(input_image_path, 2, 2)