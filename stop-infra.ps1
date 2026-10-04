# ==============================================================================
# SCRIPT DỪNG HẠ TẦNG DOCKER
# ==============================================================================
Write-Host ">>> Đang dừng các container hạ tầng (Postgres, Redis, Adminer)..." -ForegroundColor Yellow
docker compose down
Write-Host ">>> Đã dừng toàn bộ hạ tầng thành công. Dữ liệu trong Volume vẫn được bảo lưu an toàn." -ForegroundColor Green
