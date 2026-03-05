$imgPath = 'C:\Users\lapto\GitHub\vision-coaching-institute\public\images\gallery\photo-14.jpg'
$bytes   = [System.IO.File]::ReadAllBytes($imgPath)
$b64     = [Convert]::ToBase64String($bytes)
$ts      = "export const GALLERY_HERO_B64 = `"data:image/jpeg;base64,$b64`";"
[System.IO.File]::WriteAllText('C:\Users\lapto\GitHub\vision-coaching-institute\src\lib\gallery-hero-b64.ts', $ts)
Write-Host "Done. Length: $($ts.Length) chars"
