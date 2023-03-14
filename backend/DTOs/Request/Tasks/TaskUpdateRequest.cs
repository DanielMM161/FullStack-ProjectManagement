namespace backend.DTOs.Request.Tasks;

using backend.Models;

public class TaskUpdateRequest : BaseDTO<TaskList>
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public TaskList.PriorityTask? Priority { get; set; }
    public DateTime? DueDate { get; set; }

    public override void UpdateModel(TaskList model)
    {
        model.Title = Title != null ? Title : model.Title;
        model.Description = Description != null ? Description : model.Description;
        model.Priority = Priority != null ? (TaskList.PriorityTask)Priority : model.Priority;
        model.DueDate = DueDate != null ? DueDate : model.DueDate;
    }
}