namespace backend.src.DTOs.Project;

using backend.src.DTOs;
using backend.src.DTOs.User;
using backend.src.Models;

public class ProjectReadDTO : BaseDTO<Project>
{   
    public int Id { get; set; } 
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public ICollection<UserReadDTO> Users { get; set; } = null!;
}
