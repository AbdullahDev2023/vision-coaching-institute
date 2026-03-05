$files = Get-ChildItem 'C:\Users\lapto\GitHub\vision-coaching-institute\public\images\gallery\' -Filter *.jpg | Sort-Object Length -Descending
foreach ($f in $files) {
  $kb = [math]::Round($f.Length / 1KB)
  Write-Host "$($f.Name)  $($kb)KB"
}
