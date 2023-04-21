namespace backend.src.Models;

using System.ComponentModel.DataAnnotations;

public class TaskList : BaseModel
{
    [MaxLength(60)]
    public string Title { get; set; } = null!;
    [MaxLength(200)]
    public string? Description { get; set; } = null!;
    public TaskList? Parent { get; set; }
    public int? ParentId { get; set; }
    public bool? Done { get; set; }
    public DateTime? DueDate { get; set; }
    public List List { get; set; } = null!;
    public int ListId { get; set; }
    public Priority PriorityTask { get; set; } = Priority.low;
    public ICollection<User>? Users { get; set; } = null!;
    public User CreatedBy { get; set; } = null!;
    public int CreatedById { get; set; }
    public int ProjectId { get; set; }
    public ICollection<Comment>? Comments { get; set; } = null!;

    public enum Priority
    {
        low,
        medium,
        high
    }

}