#!/bin/bash

echo "Starting Healthcare MERN Application..."
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers concurrently
npm run server &
sleep 3
cd client && npm start &

echo ""
echo "Application started successfully!"
echo ""
echo "Open your browser and go to: http://localhost:3000"
echo ""

wait
