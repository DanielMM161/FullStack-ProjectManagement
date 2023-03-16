namespace backend.src.DTOs.Project;

using backend.src.DTOs;
using backend.src.DTOs.User;
using backend.src.Models;
using System.ComponentModel.DataAnnotations;

public class ProjectCreateDTO : BaseDTO<Project>
{
    [Required]
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    [Required]
    public ICollection<int> UsersId { get; set; } = null!;
    
    public override void UpdateModel(Project model)
    {
        Console.WriteLine($"UpdateModel --- {Name}");
        model.Name = Name;
        model.Description = Description;
        Console.WriteLine($"UpdateModel --- {model.Name}");
    }
}
