using backend.src.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.src.Db.TestFixtures;

public class DbTestFixtures 
{
    private static readonly object _lock = new();
    private static bool _dbInitialized;
    private readonly IConfiguration _configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();    

    public DbTestFixtures() 
    {        
        lock(_lock)
        {
            if(!_dbInitialized)
            {
                using (var context = CreateContext())
                {
                    context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();
                    var newProject = new Project
                    {            
                        Name = "Project 1",
                        Description = "Description 1",
                        Users = new User[] { new User() { FirstName = "Daniel", LastName = "Moreno", Email = "d@example.com" }  }    
                    };
                    // var newList = new List
                    // {
                    //     Title = "First List",
                    //     ProjectId = 1
                    // };
                    context.Add(newProject);    
                    //context.Add(newList);
                    context.SaveChanges();
                }
                _dbInitialized = true;
            }
        }
    }

    public AppDbContext CreateContext() 
    {
        var dbContext = new AppDbContext(_configuration, DbType.Test);
        return dbContext;
    }

}