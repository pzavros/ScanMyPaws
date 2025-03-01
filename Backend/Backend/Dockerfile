# Base image for runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files correctly
COPY ["Backend/Backend/Backend.csproj", "Backend/Backend/"]

WORKDIR "/src/Backend/Backend"

RUN dotnet restore "Backend.csproj"

# Copy entire source and build the application
COPY Backend/Backend/. ./

RUN dotnet build "Backend.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish stage
FROM build AS publish
WORKDIR "/src/Backend/Backend"
RUN dotnet publish "Backend.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Entry point
ENTRYPOINT ["dotnet", "Backend.dll"]
