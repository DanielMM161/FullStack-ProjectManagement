namespace backend.src.DTOs.Task;

using backend.src.DTOs.Comment;
using backend.src.DTOs.SubTask;
using backend.src.DTOs.User;
using backend.src.Models;

public class TaskReadDTO : BaseDTO<TaskList>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public TaskList.Priority? PriorityTask { get; set; }
    public ICollection<SubTaskReadDTO> SubTasks { get; set; } = null!;
    public DateTime? DueDate { get; set; }
    public ICollection<UserReadDTO>? Users { get; set; } = null!;
    public UserReadDTO CreatedBy { get; set; } = null!;    
    public ICollection<CommentReadDTO>? Comments { get; set; } = null!;
}