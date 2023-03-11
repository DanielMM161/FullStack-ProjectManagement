namespace backend.Models;

using System.ComponentModel.DataAnnotations;

public class Project : BaseModel
{
    [MaxLength(60)]
    public string Name { get; set; } = null!;
    [MaxLength(200)]
    public string? Description { get; set; }
    public ICollection<User> Users { get; set; } = null!;
    public ICollection<List> Lists { get; set; } = null!;
}