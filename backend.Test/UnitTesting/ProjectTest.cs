namespace backend.Test.UnitTesting;

using backend.src.Db.TestFixtures;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;
using Xunit.Abstractions;
using Xunit.Sdk;

[TestCaseOrderer("backend.Test.UnitTesting.PriorityOrderer", "backend.Test")]
public class ProjectTest : IClassFixture<DbTestFixtures>
{
    public DbTestFixtures Fixture { get; }
    private ProjectRepo _repo { get; set; }
    
    public ProjectTest(DbTestFixtures fixture)
    {
        Fixture = fixture;
        _repo = new ProjectRepo(Fixture.CreateContext());        
    }

    [Fact,  TestPriority(0)]
    public async Task TestCreateProject()
    {         
        var newProject = new Project
        {            
            Name = "New Project",
            Description = "New Description",
            Users = new User[] { new User() { FirstName = "Daniel", LastName = "Moreno", Email = "d@example.com" }  }      
        };

        var result = await _repo.CreateOneAsync(newProject);        
        Assert.True(result.Name == "New Project");   
    }

    [Fact,  TestPriority(1)]
    public async Task TestUpdateProject()
    {     
        var project = await _repo.GetByIdAsync(1);
        project.Name = "New Project For Update, Updated";

        var result = await _repo.UpdateOneAsync(project);        
        Assert.True(result.Name == "New Project For Update, Updated");           
    }

   [Fact,  TestPriority(2)]
    public async Task TestGetProjectById()
    {           
        var result = await _repo.GetByIdAsync(1);
        Assert.True(result.Id == 1);        
    }

    [Fact,  TestPriority(3)]
    public async Task TestDeleteProject()
    {    
        var project = await _repo.GetByIdAsync(1);        
        var result = await _repo.DeleteOneAsync(project);
        project = await _repo.GetByIdAsync(1);

        Assert.True(result == true);        
        Assert.True(project == null);
    }
}