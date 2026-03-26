param()

$ErrorActionPreference = "Stop"

git config core.hooksPath .githooks
Write-Host "Git hooks path has been set to .githooks"
Write-Host "Pre-commit UTF-8 guard is now active for this repository."
