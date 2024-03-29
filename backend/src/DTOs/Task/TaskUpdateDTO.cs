namespace backend.src.DTOs.Task;

using backend.src.Models;

public class TaskUpdateDTO : BaseDTO<TaskList>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public TaskList.Priority? PriorityTask { get; set; }
    public DateTime? DueDate { get; set; }
}