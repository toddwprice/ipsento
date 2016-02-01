echo "gulp prepare-release"
gulp prepare-release
echo "gulp export"
gulp export
echo "aws s3 sync"
aws s3 sync ./export/ s3://jarvis.page-vault.com --size-only --delete
echo "gulp unbundle"
gulp unbundle
