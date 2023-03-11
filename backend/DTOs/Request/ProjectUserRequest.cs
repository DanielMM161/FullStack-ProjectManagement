namespace backend.DTOs.Request;

using System.ComponentModel.DataAnnotations;

public class ProjectUserRequest
{
    [Required]
    public int ProjectId { get; set; }

    [Required]
    public ICollection<int> UsersId { get; set; } = null!;
}