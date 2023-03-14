namespace backend.DTOs.Response.Project;

using backend.Models;

public class ProjectByIdResponse : BaseModel
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; } = null!;
    public ICollection<UserResponse>? Users { get; set; }

    public static ProjectByIdResponse FromProject(Project project)
    {
        var userResponse = project.Users.Select(u => UserResponse.FromUser(u)).ToList();
        return new ProjectByIdResponse
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            Users = userResponse,            
        };
    }
}