namespace backend.Models;

using System.ComponentModel.DataAnnotations;

public class Task : BaseModel
{
    [MaxLength(60)]
    public string Title { get; set; } = null!;
    [MaxLength(200)]
    public Task? Parent { get; set; }
    public string Description { get; set; } = null!;
    public DateTime DueDate { get; set; } = DateTime.Now.AddDays(7);
    public List List { get; set; } = null!;
    public int ListId { get; set; }
    public PriorityTask Priority { get; set; } = PriorityTask.low;
    public ICollection<User>? Users { get; set; } = null!;
    public User CreatedBy { get; set; } = null!;
    public int CreatedById { get; set; }

    public enum PriorityTask
    {
        low,
        medium,
        high
    }

}