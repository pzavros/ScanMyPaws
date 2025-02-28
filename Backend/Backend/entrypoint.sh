#!/bin/sh
set -e

echo "Waiting for SQL Server to start..."
sleep 10  # Ensures database is ready

echo "Applying migrations..."
dotnet ef database update

echo "Starting backend..."
exec dotnet Backend.dll
