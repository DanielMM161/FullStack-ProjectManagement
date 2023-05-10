using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.src.Db;
using backend.src.Models;
using backend.src.Services.ProjectService;
using backend.src.Services.UserService;
using backend.src.Services.AuthService;
using backend.src.Services.ListService;
using backend.src.Services.TokenService;
using backend.src.Repositories.ProjectRepo;
using backend.src.Repositories.UserRepo;
using backend.src.Repositories.ListRepo;
using backend.src.Repositories.TaskRepo;
using backend.src.Services.TaskService;
using backend.src.Services.SubTaskService;
using backend.src.Repositories.SubTaskRepo;
using backend.src.Authorization;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using backend.src.Middleware;
using backend.src.Helpers;
using backend.src.Services.GoogleService;
using backend.src.Repositories.CommentRepo;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        // Fix the JSON cycle issue
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services
    .AddIdentity<User, IdentityRole<int>>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors", 
        builder =>
    {
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowedToAllowWildcardSubdomains();
    });
});

builder.Services.AddAuthorization(option =>
    {
    option.AddPolicy(
        "Belong",
        policyBuuilder => policyBuuilder.AddRequirements(
            new BelongProjectHandlerRequirement.BelongProjectRequirement())
        );
    });


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ErrorHandleMiddleware>();
builder.Services.AddTransient<ClaimsPrincipal>(s =>
    s.GetService<IHttpContextAccessor>().HttpContext.User);

builder.Services.AddSingleton<IAuthorizationHandler, BelongProjectHandlerRequirement>();

builder.Services.AddScoped<IClaimsPrincipalService, ClaimsPrincipalService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services
    .AddScoped<IUserRepo, UserRepo>()
    .AddScoped<IUserService, UserService>();
builder.Services
    .AddScoped<IProjectRepo, ProjectRepo>()
    .AddScoped<IProjectService, ProjectService>();
builder.Services
    .AddScoped<IListRepo, ListRepo>()
    .AddScoped<IListService, ListService>();
builder.Services
    .AddScoped<ITaskRepo, TaskRepo>()
    .AddScoped<ITaskService, TaskService>();
builder.Services
    .AddScoped<ISubTaskRepo, SubTaskRepo>()
    .AddScoped<ISubTaskService, SubTaskService>();
builder.Services.AddScoped<IGoogleService, GoogleService>();
builder.Services.AddScoped<ICommentRepo, CommentRepo>();

builder.Services
    .AddAuthentication(option =>
    {
        option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidIssuer =  builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes( builder.Configuration["Jwt:Secret"]))
        };
    });

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();    
app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "Project Management");
        options.RoutePrefix = string.Empty;
    });

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   // app.UseHttpsRedirection();
    app.UseCors("cors");
    app.UseSwagger();
    app.UseSwaggerUI();    
    app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Project Management");
            options.RoutePrefix = string.Empty;
        });

    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetService<AppDbContext>();
        var config = scope.ServiceProvider.GetService<IConfiguration>();
        
        if (dbContext is not null && config.GetValue<bool>("CreateDbAtStart", true))
        {
            // dbContext.Database.EnsureDeleted();
            // dbContext.Database.EnsureCreated();
        }
    }
}

//app.UseHttpsRedirection();

// This has to be before app.UseAuthorization()
app.UseAuthentication();

app.UseAuthorization();

app.UseMiddleware<ErrorHandleMiddleware>();

app.MapControllers();

app.Run();

public partial class Program { }