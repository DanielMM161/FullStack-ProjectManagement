namespace backend.DTOs.Request.Project;

using System.ComponentModel.DataAnnotations;

public class ProjectUserRequest
{
    [Required]
    public ICollection<int> UsersId { get; set; } = null!;
}