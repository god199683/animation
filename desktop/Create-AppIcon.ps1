Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 256,256
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear([System.Drawing.Color]::Transparent)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,18,29,58))), 8,8,240,240)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,91,234,221))), 42,34,172,182)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(120,255,255,255))), 70,56,62,44)
$g.FillEllipse([System.Drawing.Brushes]::White, 82,119,22,22)
$g.FillEllipse([System.Drawing.Brushes]::White, 151,119,22,22)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,13,25,50))), 89,125,10,10)
$g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,13,25,50))), 158,125,10,10)
$pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255,13,25,50)),7
$g.DrawArc($pen,104,139,50,33,10,160)
$star = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255,255,165,223))
$g.FillPolygon($star, [System.Drawing.Point[]]@( [System.Drawing.Point]::new(202,37),[System.Drawing.Point]::new(210,59),[System.Drawing.Point]::new(233,66),[System.Drawing.Point]::new(212,75),[System.Drawing.Point]::new(205,99),[System.Drawing.Point]::new(196,77),[System.Drawing.Point]::new(174,69),[System.Drawing.Point]::new(195,60) ))
$icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon())
$stream = [System.IO.File]::Open((Join-Path $PSScriptRoot 'app.ico'), [System.IO.FileMode]::Create)
$icon.Save($stream); $stream.Close(); $g.Dispose(); $bmp.Dispose()
