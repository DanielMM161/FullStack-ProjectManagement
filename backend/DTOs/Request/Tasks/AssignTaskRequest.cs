namespace backend.DTOs.Request.Tasks;

using System.ComponentModel.DataAnnotations;

public class AssignTaskRequest
{
    [Required]
    public int UserId { get; set; }
    [Required]
    public int ProjectId { get; set; }
}