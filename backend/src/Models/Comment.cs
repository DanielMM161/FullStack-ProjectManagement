using System.ComponentModel.DataAnnotations;

namespace backend.src.Models;

public class Comment : BaseModel
{
    [MaxLength(300)]
    public string Message { get; set; } = null!;
    public User user { get; set; } = null!;
    public int UserId { get; set; }
    public TaskList Task { get; set; } = null!;
    public int TaskId { get; set; }
}