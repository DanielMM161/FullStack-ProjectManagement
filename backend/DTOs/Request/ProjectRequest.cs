namespace backend.DTOs.Request;

using backend.DTOs.Response;
using backend.Models;

public class ProjectRequest : BaseDTO<Project>
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public ICollection<int> UsersId { get; set; } = null!;

    public override void UpdateModel(Project model)
    {
        model.Name = Name;
        model.Description = Description;
    }
}