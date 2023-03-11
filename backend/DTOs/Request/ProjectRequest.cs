namespace backend.DTOs.Request;

using System.ComponentModel.DataAnnotations;
using backend.Models;

public class ProjectRequest : BaseDTO<Project>
{
    [Required]
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    [Required]
    public ICollection<int> UsersId { get; set; } = null!;

    public override void UpdateModel(Project model)
    {
        model.Name = Name;
        model.Description = Description;
    }
}