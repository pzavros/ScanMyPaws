# Use the .NET SDK for building and migrations
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

# Run migrations inside the build container
RUN dotnet tool install --global dotnet-ef
RUN export PATH="$PATH:/root/.dotnet/tools" && dotnet ef database update

# Use the runtime image for execution
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./

# Expose API port
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "Backend.dll"]
