using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PlayArt.Api;
using PlayArt.Core.entities;
using PlayArt.Core.Interfaces.IRepositories;
using PlayArt.Core.Interfaces.Services_interfaces;
using PlayArt.Core.Interfaces;
using PlayArt.Core;
using PlayArt.Data.Repositories;
using PlayArt.Data.Repository;
using PlayArt.Data;
using PlayArt.Service;
using PlayArt.Sevice;
using System.Text;
using DotNetEnv;
using Amazon.Extensions.NETCore.Setup;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using Web.Net.Service;

// ����� ����� �����
Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddSingleton<IAmazonS3>(serviceProvider =>
{
    var options = serviceProvider.GetRequiredService<IOptions<AWSOptions>>().Value;

    // ����� Credentials ����� ����
    var credentials = new Amazon.Runtime.BasicAWSCredentials(
       Environment.GetEnvironmentVariable("AWS_ACCESS_KEY"),
        Environment.GetEnvironmentVariable("AWS_SECRET_KEY")
    );

    // ����� Region
    var region = Amazon.RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"]);


    return new AmazonS3Client(credentials, region);
});

builder.Services.AddHttpClient();  // ����� HttpClient ��������




// ����� CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
           policy.AllowAnyOrigin()  // ����� ��� ���� ����
                 .AllowAnyMethod()
                 .AllowAnyHeader());
});



// ����� JWT Authentication
builder.Services.AddScoped<AuthService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// ����� ������ �������-�������
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserorOrAdmin", policy => policy.RequireRole("User", "Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
});

builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.AllowSynchronousIO = true;
});

// ����� ������� ���� ����� �-Application
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    });
});

builder.Services.AddDbContext<DataContext>();

// ����� �-Repositories
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<IDrawingRepository, DrawingRepository>();
builder.Services.AddScoped<IPaintedDrawingRepository, PaintedDrawingRepository>();
builder.Services.AddScoped<IDrawingService, DrawingService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserRoleRepository, UserRoleRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRepositoryManager, RepositoryManager>();

// ����� �-Services

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDrawingService, DrawingService>();
builder.Services.AddScoped<IPaintedDrawingService, PaintedDrawingService>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();


// ����� AutoMapper
builder.Services.AddAutoMapper(typeof(ProfileMapping), typeof(ProfileMappingPostModel));

builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();



var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var app = builder.Build();

// Middleware ������ �-API
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger(); // ����� �� Swagger
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "PlayArt API V1");
    });
//}

app.UseHttpsRedirection();

// ����� �-CORS
app.UseCors("AllowAllOrigins");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapGet("/", () => "running");
app.Run();



