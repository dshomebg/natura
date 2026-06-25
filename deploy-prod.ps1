# NATURA Docker Deployment Script (PowerShell) - PRODUCTION
# Builds the app image locally, ships it to the server as a tar, and runs it.
# The server never builds (fewer surprises). Mirrors the DSHome deploy flow.

$ErrorActionPreference = "Stop"

# Configuration
$REMOTE_USER  = "root"
$REMOTE_HOST  = "SET-NATURA-SERVER-IP"   # <-- попълни IP-то на сървъра на NATURA
$REMOTE_DIR   = "/opt/natura"

if ($REMOTE_HOST -eq "SET-NATURA-SERVER-IP") {
    Write-Host "[X] Set `$REMOTE_HOST to the NATURA server IP first." -ForegroundColor Red
    exit 1
}
$COMPOSE_FILE = "docker-compose.prod.yml"
$IMAGE        = "natura-prod-app:latest"
$TAR          = "natura-app-image.tar"
$SITE_URL     = "https://www.natura-bg.com"

Write-Host "===================================="
Write-Host "NATURA PRODUCTION Deployment"
Write-Host "Server: $REMOTE_HOST"
Write-Host "===================================="
Write-Host ""

# Test SSH connection
Write-Host "Testing SSH connection..."
try {
    ssh "$REMOTE_USER@$REMOTE_HOST" "echo Connected" | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "SSH failed" }
    Write-Host "[OK] SSH connection works" -ForegroundColor Green
} catch {
    Write-Host "[X] SSH connection failed. Check your SSH key/config." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 1: Build the app image locally (bakes the public URL into the build)
Write-Host "[1/6] Building app image locally..."
$env:NEXT_PUBLIC_SERVER_URL = $SITE_URL
docker compose -f $COMPOSE_FILE build app
if ($LASTEXITCODE -ne 0) { throw "App build failed" }
Write-Host "[OK] Image built: $IMAGE" -ForegroundColor Green

# Step 2: Save the image to a tar file
Write-Host ""
Write-Host "[2/6] Saving image to $TAR..."
docker save $IMAGE -o $TAR
if ($LASTEXITCODE -ne 0) { throw "docker save failed" }

# Step 3: Ensure remote dir + upload (scp -C compresses during transfer)
Write-Host ""
Write-Host "[3/6] Uploading image and compose file..."
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_DIR"
if ($LASTEXITCODE -ne 0) { throw "mkdir on server failed" }

scp -O -C $TAR "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"
if ($LASTEXITCODE -ne 0) { throw "Image upload failed" }
Write-Host "[OK] Image uploaded" -ForegroundColor Green

scp -O $COMPOSE_FILE "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_DIR}/"
if ($LASTEXITCODE -ne 0) { throw "Compose upload failed" }
Write-Host "[OK] Compose uploaded" -ForegroundColor Green

# Step 4: Load image on the server
Write-Host ""
Write-Host "[4/6] Loading image on server..."
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIR && docker load -i $TAR && rm -f $TAR"
if ($LASTEXITCODE -ne 0) { throw "docker load failed" }

# Step 5: Deploy (reads /opt/natura/.env automatically)
Write-Host ""
Write-Host "[5/6] Deploying with Docker Compose..."
ssh "$REMOTE_USER@$REMOTE_HOST" "cd $REMOTE_DIR && docker compose -f $COMPOSE_FILE up -d --no-build && docker image prune -f"
if ($LASTEXITCODE -ne 0) { throw "Deploy failed" }

# Step 6: Cleanup local tar
Write-Host ""
Write-Host "[6/6] Cleaning up local tar..."
Remove-Item $TAR -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "===================================="
Write-Host "PRODUCTION Deployment completed!" -ForegroundColor Green
Write-Host "===================================="
Write-Host ""
Write-Host "  Site:  $SITE_URL"
Write-Host "  Admin: $SITE_URL/admin"
Write-Host ""
