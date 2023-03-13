using backend.Models;

namespace backend.DTOs.Request;

public class TaskUpdateRequest : BaseDTO<TaskList>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public TaskList.PriorityTask? Priority { get; set; }

    public override void UpdateModel(TaskList model)
    {
        model.Title = Title != null ? Title : model.Title;
        model.Description = Description != null ? Description : model.Description;
        model.Priority = Priority != null ? (TaskList.PriorityTask)Priority : model.Priority;
    }
}