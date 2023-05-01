namespace backend.Test.UnitTesting;

using backend.src.Db.TestFixtures;
using backend.src.Models;
using backend.src.Repositories.ListRepo;
using backend.src.Repositories.ProjectRepo;

public class ListTest : IClassFixture<DbTestFixtures>
{
    public DbTestFixtures Fixture { get; }
    private ListRepo _repo { get; set; }        
    
    public ListTest(DbTestFixtures fixture)
    {
        Fixture = fixture;
        _repo = new ListRepo(Fixture.CreateContext());        
    }

    [Fact]
    public async void TestCreateList()
    {         
        var newList = new List
        {            
            Title = "New List 2",
            ProjectId = 1,  
        };

        var result = await _repo.CreateOneAsync(newList);        
        Assert.True(result.Title == "New List 2");   
    }

    // [Fact]
    // public async void TestUpdateProject()
    // {           
    //     var projectUpdate = new Project
    //     {   
    //         Id = 1,
    //         Name = "New Project Update",
    //         Description = "Description 1",
    //         Users = new User[] { new User() { FirstName = "Daniel", LastName = "Moreno", Email = "d@example.com" }  }      
    //     };

    //     var allProject = await _repo.GetAllAsync(null);
         
    //     var result = await _repo.UpdateOneAsync(projectUpdate);        
    //     Assert.True(result.Name == "New Project Update");           
    // }

    // [Fact]
    // public async void TestGetProjectById()
    // {           
    //     var result = await _repo.GetByIdAsync(1);
    //     Assert.True(result.Id == 1);        
    // }

    // [Fact]
    // public async void TestDeleteProject()
    // {     
    //     var project = await _repo.GetByIdAsync(1);
    //     var result = await _repo.DeleteOneAsync(project);
    //     var allProject = await _repo.GetAllAsync(null);

    //     Assert.True(result == true);        
    //     Assert.True(allProject.Count() == 1);
    // }
}