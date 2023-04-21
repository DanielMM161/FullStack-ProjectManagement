namespace backend.src.Db;

using backend.src.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Npgsql;
using NETCoreDemo.Db;

public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    private readonly IConfiguration _config;

    static AppDbContext()
    {   
        NpgsqlConnection.GlobalTypeMapper.MapEnum<TaskList.Priority>();

        // Not use time zone in EF.
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration config) : base(options) => _config = config;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var configString = _config.GetConnectionString("DefaultConnection");
        optionsBuilder
        .UseNpgsql(configString, builder =>
            {
                builder.EnableRetryOnFailure(10, TimeSpan.FromSeconds(15), null);
            })
        .AddInterceptors(new AppDbContextSaveChangesInterceptor())
        .UseSnakeCaseNamingConvention();
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        ModelBuilderConfig.UserConfig(modelBuilder);
        ModelBuilderConfig.ProjectConfig(modelBuilder);
        ModelBuilderConfig.TaskConfig(modelBuilder);
        modelBuilder.AddIdentityConfig();
    }

    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<List> Lists { get; set; } = null!;
    public DbSet<TaskList> Tasks { get; set; } = null!;
    public DbSet<Comment> Comments { get; set; } = null!;
}