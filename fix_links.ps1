$files = Get-ChildItem 'c:\Users\nihal\Downloads\asdwa' -Filter '*.html'
foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f.FullName)
    $backtickLink = 'css/design-system.css">' + '
  <link rel="stylesheet" href="css/responsive.css">'
    $realLink = 'css/design-system.css">' + [System.Environment]::NewLine + '  <link rel="stylesheet" href="css/responsive.css">'
    $c2 = $c.Replace($backtickLink, $realLink)
    [System.IO.File]::WriteAllText($f.FullName, $c2)
    Write-Host ('Fixed: ' + $f.Name)
}
