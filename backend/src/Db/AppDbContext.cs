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
    private readonly DbType _dbType;    

    static AppDbContext()
    {   
        NpgsqlConnection.GlobalTypeMapper.MapEnum<TaskList.Priority>();

        // Not use time zone in EF.
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
    }
    
    public AppDbContext(IConfiguration config, DbType dbType = DbType.Development)
    { 
        _dbType = dbType;
        _config = config;        
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {        
        optionsBuilder
        .UseNpgsql(ConnectionString(), builder =>
            {
                builder.EnableRetryOnFailure(10, TimeSpan.FromSeconds(15), null);
            })
        .AddInterceptors(new AppDbContextSaveChangesInterceptor())
        .UseSnakeCaseNamingConvention();
        base.OnConfiguring(optionsBuilder);
    }

    private string ConnectionString()
    {
        switch (_dbType)
        {
            case DbType.Development:
                {
                    return _config.GetConnectionString("DevelopmentConnection");
                }
            case DbType.Production:
                {
                    return _config.GetConnectionString("ProductionConnection");
                }
            case DbType.Test:
                {
                    return _config.GetConnectionString("TestConnection");
                }
            case DbType.Transactional:
                {
                    return _config.GetConnectionString("TransactionalConnection");
                }
        }
        throw new Exception("No database type was provided");
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
public enum DbType
{
    Development,
    Production,
    Test,
    Transactional
}