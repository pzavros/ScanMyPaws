using Backend;
using Backend.Hubs;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to listen on port 5000 (HTTP)
builder.WebHost.UseUrls("http://0.0.0.0:5000");

// Build the connection string from environment variables
var server = builder.Configuration["server"] ?? "sqlserver";
var database = builder.Configuration["database"] ?? "ScanMyPaws";
var port = builder.Configuration["port"] ?? "1433";
var user = builder.Configuration["dbuser"] ?? "sa";
var password = builder.Configuration["password"] ?? "ScanMyPaws2806";

//docker
//var connectionString = $"Server={server},{port};Initial Catalog={database};User ID={user};Password={password};TrustServerCertificate=True;";

//local
var connectionString = "Server=(localdb)\\mssqllocaldb;Database=ScanMyPaws;Trusted_Connection=True;";
// Register Services & Dependencies
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Your custom services
builder.Services.AddScoped<IQrCodeService, QrCodeService>();
builder.Services.AddScoped<IPetProfileService, PetProfileService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IDogBreedService, DogBreedService>();
builder.Services.AddScoped<IPetCardService, PetCardService>();
builder.Services.AddScoped<IMedicalRecordService, MedicalRecordService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IScheduleService, ScheduleService>();
builder.Services.AddScoped<IPetCardSettingService, PetCardSettingService>();
builder.Services.AddScoped<IPetLocationService, PetLocationService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddSignalR();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy
            .WithOrigins(
                "http://localhost:5173", 
                "https://localhost:5173",
                "http://localhost:5175",       
                "https://scanmypaws.com"       
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
    );
});

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "your-secret-key")
            )
        };
    });

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000);
});

// Build the app
var app = builder.Build();

// Enable Swagger in Dev & Production
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Run DB Migration (if you have an auto-migrate service)
DatabaseManagementService.MigrationInitialization(app);

//Configure Middleware
app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

// Map Routes & Hubs
app.MapControllers();

// Map SignalR hubs
app.MapHub<ChatHub>("/chatHub");
app.MapHub<NotificationHub>("/notificationHub");

// Run the app
app.Run();



//appsettings.json
//"DefaultConnection": "Server=sqlserver;Database=ScanMyPaws;User Id=sa;Password=ScanMyPaws2806;",
//"DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ScanMyPaws;Trusted_Connection=True;"