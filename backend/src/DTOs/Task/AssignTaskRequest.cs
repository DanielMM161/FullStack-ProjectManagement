namespace backend.src.DTOs.Request.Tasks;

using System.ComponentModel.DataAnnotations;

public class AssignTaskRequest
{
    [Required]
    public int UserId { get; set; }
}