Write-Host ">>> Kiem tra Docker Daemon..." -ForegroundColor Cyan

$dockerRunning = $false
docker info > $null 2>&1
if ($LASTEXITCODE -eq 0) {
    $dockerRunning = $true
}

if (-not $dockerRunning) {
    Write-Host ">>> Docker Desktop chua duoc bat. Dang kich hoat Docker Desktop..." -ForegroundColor Yellow
    $dockerDesktopPath = "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    if (Test-Path $dockerDesktopPath) {
        Start-Process -FilePath $dockerDesktopPath
        Write-Host ">>> Dang cho Docker Engine khoi dong (khoang 15-30 giay)..." -ForegroundColor Yellow
        $elapsed = 0
        while ($elapsed -lt 60) {
            Start-Sleep -Seconds 3
            $elapsed += 3
            docker info > $null 2>&1
            if ($LASTEXITCODE -eq 0) {
                $dockerRunning = $true
                Write-Host ">>> Docker Engine da san sang!" -ForegroundColor Green
                break
            }
            Write-Host "    Dang cho Docker Engine ($elapsed s)..." -ForegroundColor Gray
        }
    } else {
        Write-Host ">>> Vui long mo Docker Desktop thu cong tren may!" -ForegroundColor Red
        exit 1
    }
}

if ($dockerRunning) {
    Write-Host ">>> Dang khoi dong cac container ha tang (Postgres, Redis, Adminer)..." -ForegroundColor Cyan
    docker compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "====================================================================" -ForegroundColor Green
        Write-Host " HA TANG DOCKER DA KHOI CHAY THANH CONG!" -ForegroundColor Green
        Write-Host " - PostgreSQL:  localhost:5432 (DB: restaurant_erp, User: postgres)" -ForegroundColor White
        Write-Host " - Redis:       localhost:6379" -ForegroundColor White
        Write-Host " - Adminer Web: http://localhost:8082" -ForegroundColor White
        Write-Host "====================================================================" -ForegroundColor Green
    }
} else {
    Write-Host ">>> Docker chua san sang. Vui long mo Docker Desktop roi chay lai lenh." -ForegroundColor Red
}
