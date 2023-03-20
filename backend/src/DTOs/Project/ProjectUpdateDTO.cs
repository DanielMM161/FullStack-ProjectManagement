namespace backend.src.DTOs.Project;

using backend.src.DTOs;
using backend.src.Models;

public class ProjectUpdateDTO : BaseDTO<Project>
{
    public string? Name { get; set; } = null!;
    public string? Description { get; set; }    
    public ICollection<int>? UsersId { get; set; } = null!;
}
