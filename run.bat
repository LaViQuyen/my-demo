@echo off

call .\install.bat >nul
echo Install completed
call .\build.bat >nul
echo Build completed
npm run server

echo The web is running at http://localhost:3000
