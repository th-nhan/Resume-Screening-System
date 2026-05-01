from gmail_service import get_gmail_service

print("Bắt đầu tiến trình cấp quyền Gmail...")
print("Hãy để ý tab trình duyệt mới sắp được mở ra (hoặc copy link bên dưới dán vào trình duyệt).")
get_gmail_service()
print("🎉 Cấp quyền thành công! Đã tạo file token.json. Bây giờ bạn có thể dùng Web bình thường.")
