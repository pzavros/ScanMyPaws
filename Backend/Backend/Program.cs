using Backend;
using Backend.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Configure the HTTP server to listen on all network interfaces
//builder.WebHost.UseUrls("http://0.0.0.0:5000", "https://0.0.0.0:44330");
// builder.WebHost.UseUrls("http://0.0.0.0:5000", "https://0.0.0.0:5001");
builder.WebHost.UseUrls("http://0.0.0.0:5000");



// Build the connection string dynamically from environment variables
var server = builder.Configuration["server"] ?? "sqlserver";
var database = builder.Configuration["database"] ?? "ScanMyPaws";
var port = builder.Configuration["port"] ?? "1433";
var user = builder.Configuration["dbuser"] ?? "sa";
var password = builder.Configuration["password"] ?? "ScanMyPaws2806";

var connectionString = $"Server={server},{port};Initial Catalog={database};User ID={user};Password={password};TrustServerCertificate=True;";

// Register services
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
builder.Services.AddSignalR();

// Configure CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "your-secret-key"))
        };
    });


builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000);
});



var app = builder.Build();

// Enable Swagger for Development & Production
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Call the Migration Service
DatabaseManagementService.MigrationInitialization(app);

app.UseHttpsRedirection();
//app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<NotificationHub>("/notificationHub");

app.Run();
