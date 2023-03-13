using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Request;

public class AssignTaskRequest
{
    [Required]
    public int UserId { get; set; }
    [Required]
    public int ProjectId { get; set; }
}