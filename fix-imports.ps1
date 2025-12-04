$files = Get-ChildItem -Path "c:/Users/HP/Downloads/CALCULADORA CIVIL/civil-app/src/features/calculators" -Recurse -Filter "*.jsx"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $newContent = $content -replace "from '\.\.\/\.\.\/components\/ui\/Card'", "from '../../components/ui'"
    Set-Content -Path $file.FullName -Value $newContent -NoNewline
}
Write-Host "Imports corregidos en $($files.Count) archivos"
