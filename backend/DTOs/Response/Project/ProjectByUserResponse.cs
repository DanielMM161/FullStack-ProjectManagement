namespace backend.DTOs.Response.Project;

using backend.Models;

public class ProjectResponse : BaseModel
{    
    public string Name { get; set; } = null!;
    public string? Description { get; set; } = null!;
    public ICollection<UserResponse>? Users { get; set; }
    public int TaskCount { get; set; }    

    public static ProjectResponse FromProject(Project project)
    {
        var userResponse = project.Users.Select(u => UserResponse.FromUser(u)).ToList();
        return new ProjectResponse
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            Users = userResponse,
            TaskCount = project.TaskListCount
        };
    }
}