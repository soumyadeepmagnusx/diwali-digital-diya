# AWS S3 & CloudFront Deployment Script for Diwali Digital Diya
param(
  [string]$BucketName = "diwali-digital-diya",
  [string]$Region = "ap-south-1" # Mumbai region for India
)

Write-Host "🪔 Building Diwali Digital Diya production bundle..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed! Please resolve errors."
    exit $LASTEXITCODE
}

Write-Host "☁️ Syncing dist/ to AWS S3 bucket: s3://$BucketName..." -ForegroundColor Cyan
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region

Write-Host "🌐 Configuring S3 Website Hosting..." -ForegroundColor Cyan
aws s3 website "s3://$BucketName" --index-document index.html --error-document index.html

Write-Host "✨ Deployment Complete! Access via AWS S3 website endpoint." -ForegroundColor Green
