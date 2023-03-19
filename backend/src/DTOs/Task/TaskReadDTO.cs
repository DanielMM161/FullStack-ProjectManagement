namespace backend.src.DTOs.Task;

using backend.src.DTOs.SubTask;
using backend.src.Models;

public class TaskReadDTO : BaseDTO<TaskList>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public TaskList.PriorityTask? Priority { get; set; }
    public ICollection<SubTaskReadDTO> SubTasks { get; set; } = null!;
    public DateTime? DueDate { get; set; }

    public override void UpdateModel(TaskList model)
    {
        throw new NotImplementedException();
    }
}