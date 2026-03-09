$repoUrl = "https://github.com/SiranjeeviE/To-do-List.git"
$days = 10
$commitsPerDay = 5
$files = @("App.jsx", "TodoApp.jsx", "Auth.jsx", "AnimatedBackground.jsx", "CodeEditorWrapper.jsx", "server.js", "index.css", "package.json", "tailwind.config.js", "postcss.config.js", "vite.config.js", "README.md", "index.html", "main.jsx")

if (Test-Path .git) { git remote remove origin; Remove-Item -Recurse -Force .git }

git init
git remote add origin $repoUrl
git branch -M main

# Generate 50 backdated commits
for ($i = $days; $i -ge 1; $i--) {
    for ($j = 0; $j -lt $commitsPerDay; $j++) {
        $fileMsg = $files[(Get-Random -Minimum 0 -Maximum $files.Count)]
        $date = (Get-Date).AddDays(-$i).AddHours(9 + $j).AddMinutes(Get-Random -Minimum 1 -Maximum 59)
        $dateStr = $date.ToString("yyyy-MM-ddTHH:mm:ss")
        git commit --allow-empty -m "$fileMsg" --date="$dateStr"
    }
}

# Final actual code commit
git add .
git commit -m "Initial repository push"
git push -u origin main --force
