namespace backend.DTOs.Response.TaskList;

using backend.Models;

public class TaskResponse : BaseModel
{
    public string Title { get; set; } = null!;

    public static TaskResponse FromTaskList(TaskList task)
    {
        return new TaskResponse
        {
            Id = task.Id,
            Title = task.Title
        };
    }
}