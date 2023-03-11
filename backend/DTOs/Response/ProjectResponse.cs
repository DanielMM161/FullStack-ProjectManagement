using backend.Models;

namespace backend.DTOs.Response;

public class ProjectResponse : BaseModel
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public ICollection<UserResponse> Users { get; set; } = null!;

    public static ProjectResponse FromProject(Project project)
    {
        Console.WriteLine("FromProject");
        var users = project.Users
            .Select(u => UserResponse.FromUser(u))
            .ToList();

        return new ProjectResponse
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            Users = users
        };
    }
}