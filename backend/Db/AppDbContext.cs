namespace backend.Db;

using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Npgsql;

public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    private readonly IConfiguration _config;

    static AppDbContext()
    {   
        NpgsqlConnection.GlobalTypeMapper.MapEnum<Task.PriorityTask>();

        // Not use time zone in EF.
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }

    public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration config) : base(options) => _config = config;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var configString = _config.GetConnectionString("DefaultConnection");
        optionsBuilder
            .UseNpgsql(configString)
            .UseSnakeCaseNamingConvention();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresEnum<Task.PriorityTask>();

        modelBuilder.Entity<User>()
            .HasMany(u => u.Creator)
            .WithOne(t => t.CreatedBy)
            .HasForeignKey(a => a.CreatedById)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Project>()
            .Navigation(p => p.Lists)
            .AutoInclude();
        
        modelBuilder.Entity<Task>()
            .HasOne(t => t.Parent)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
            
        modelBuilder.AddIdentityConfig();
    }

    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<List> Lists { get; set; } = null!;
    public DbSet<Task> Tasks { get; set; } = null!;
}