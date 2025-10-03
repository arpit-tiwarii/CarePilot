@echo off
echo Starting Healthcare MERN Application...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start both servers concurrently
start "Backend Server" cmd /k "npm run server"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "cd client && npm start"

echo.
echo Application started successfully!
echo.
echo Open your browser and go to: http://localhost:3000
echo.
pause
