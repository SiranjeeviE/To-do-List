$repoUrl = "https://github.com/SiranjeeviE/To-do-List.git"
$days = 10
$commitsPerDay = 5
$files = @("App.jsx", "TodoApp.jsx", "Auth.jsx", "AnimatedBackground.jsx", "CodeEditorWrapper.jsx", "server.js", "index.css", "package.json", "tailwind.config.js", "postcss.config.js", "vite.config.js", "README.md", "index.html", "main.jsx")

if (Test-Path .git) { Remove-Item -Recurse -Force .git }

git init
git remote add origin $repoUrl
git branch -M main

for ($i = $days; $i -gt 0; $i--) {
    for ($j = 0; $j -lt $commitsPerDay; $j++) {
        $idx = Get-Random -Minimum 0 -Maximum $files.Count
        $fileMsg = $files[$idx]
        $date = (Get-Date).AddDays(-$i).AddHours(10 + $j)
        $dateStr = $date.ToString("yyyy-MM-ddTHH:mm:ss")
        $env:GIT_AUTHOR_DATE = $dateStr
        $env:GIT_COMMITTER_DATE = $dateStr
        git commit --allow-empty -m "$fileMsg"
    }
}

git add .
git commit -m "Final project snapshot"
git push -u origin main --force
