$files = Get-ChildItem -Path "./src/features/calculators" -Filter "*.jsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Fix paths
    $newContent = $content.Replace('from "../../components/', 'from "../../../components/')
    $newContent = $newContent.Replace('from "../../context/', 'from "../../../context/')
    $newContent = $newContent.Replace('from "../../utils/', 'from "../../../utils/')

    # Add extensions
    $newContent = $newContent.Replace('from "../../../components/ui/card"', 'from "../../../components/ui/card.jsx"')
    $newContent = $newContent.Replace('from "../../../context/BudgetContext"', 'from "../../../context/BudgetContext.jsx"')
    $newContent = $newContent.Replace('from "../../../utils/concreteData"', 'from "../../../utils/concreteData.js"')
    $newContent = $newContent.Replace('from "../../../utils/plasterData"', 'from "../../../utils/plasterData.js"')


    if ($newContent -ne $content) {
        Write-Host "Fixing imports in $($file.FullName)"
        Set-Content -Path $file.FullName -Value $newContent
    }
}

Write-Host "Import fix script finished."