# NATURA Docker Deployment Script (PowerShell) - PRODUCTION
# Builds the app image locally, ships it to the server as a tar, and runs it.
# The server never builds (fewer surprises). Mirrors the DSHome deploy flow.

$ErrorActionPreference = "Stop"

# Configuration
$REMOTE_USER  = "root"
$REMOTE_HOST  = "157.90.129.12"
$REMOTE_DIR   = "/opt/natura"
$SSH_KEY      = "$HOME\.ssh\pagagal_deploy"
$COMPOSE_FILE = "docker-compose.prod.yml"
$IMAGE        = "natura-prod-app:latest"
$TAR          = "natura-app-image.tar"
$SITE_URL     = "https://www.natura-bg.com"

$SSH  = @("-i", $SSH_KEY)
$REMOTE = "${REMOTE_USER}@${REMOTE_HOST}"

Write-Host "===================================="
Write-Host "NATURA PRODUCTION Deployment"
Write-Host "Server: $REMOTE_HOST"
Write-Host "===================================="
Write-Host ""

# Test SSH connection
Write-Host "Testing SSH connection..."
try {
    ssh @SSH $REMOTE "echo Connected" | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "SSH failed" }
    Write-Host "[OK] SSH connection works" -ForegroundColor Green
} catch {
    Write-Host "[X] SSH connection failed. Check your SSH key/config." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 1: Build the app image locally (bakes the public URL into the build)
Write-Host "[1/7] Building app image locally..."
$env:NEXT_PUBLIC_SERVER_URL = $SITE_URL
docker compose -f $COMPOSE_FILE build app
if ($LASTEXITCODE -ne 0) { throw "App build failed" }
Write-Host "[OK] Image built: $IMAGE" -ForegroundColor Green

# Step 2: Save the image to a tar file
Write-Host ""
Write-Host "[2/7] Saving image to $TAR..."
docker save $IMAGE -o $TAR
if ($LASTEXITCODE -ne 0) { throw "docker save failed" }

# Step 3: Ensure remote dir + upload (scp -C compresses during transfer)
Write-Host ""
Write-Host "[3/7] Uploading image and compose file..."
ssh @SSH $REMOTE "mkdir -p $REMOTE_DIR"
if ($LASTEXITCODE -ne 0) { throw "mkdir on server failed" }

scp @SSH -O -C $TAR "${REMOTE}:${REMOTE_DIR}/"
if ($LASTEXITCODE -ne 0) { throw "Image upload failed" }
Write-Host "[OK] Image uploaded" -ForegroundColor Green

scp @SSH -O $COMPOSE_FILE "${REMOTE}:${REMOTE_DIR}/"
if ($LASTEXITCODE -ne 0) { throw "Compose upload failed" }
Write-Host "[OK] Compose uploaded" -ForegroundColor Green

# Step 4: Load image on the server
Write-Host ""
Write-Host "[4/7] Loading image on server..."
ssh @SSH $REMOTE "cd $REMOTE_DIR && docker load -i $TAR && rm -f $TAR"
if ($LASTEXITCODE -ne 0) { throw "docker load failed" }

# Step 5: Deploy (reads /opt/natura/.env automatically)
Write-Host ""
Write-Host "[5/7] Deploying with Docker Compose..."
ssh @SSH $REMOTE "cd $REMOTE_DIR && docker compose -f $COMPOSE_FILE up -d --no-build && docker image prune -f"
if ($LASTEXITCODE -ne 0) { throw "Deploy failed" }

# Step 6: Fix media volume ownership so the app user (nextjs, uid 1001) can
# write uploads. Media seeded/transferred from Windows can end up owned by a
# foreign uid, causing EACCES (400) on upload in the admin. Idempotent.
Write-Host ""
Write-Host "[6/7] Fixing media volume permissions..."
ssh @SSH $REMOTE "docker run --rm -v natura-prod-media:/media alpine sh -c 'chown -R 1001:65533 /media && chmod -R u+rwX /media'"
if ($LASTEXITCODE -ne 0) { throw "Media permission fix failed" }
Write-Host "[OK] Media volume writable by app user" -ForegroundColor Green

# Step 7: Cleanup local tar
Write-Host ""
Write-Host "[7/7] Cleaning up local tar..."
Remove-Item $TAR -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "===================================="
Write-Host "PRODUCTION Deployment completed!" -ForegroundColor Green
Write-Host "===================================="
Write-Host ""
Write-Host "  Site:  $SITE_URL"
Write-Host "  Admin: $SITE_URL/admin"
Write-Host ""
