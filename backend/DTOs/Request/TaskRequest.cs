namespace backend.DTOs.Request;

using System.ComponentModel.DataAnnotations;
using backend.Models;

public class TaskRequest : BaseDTO<TaskList>
{
    [Required]
    public virtual string Title { get; set; } = null!;
    [Required]
    public int ListId { get; set; }
    [Required]
    public int CreatedById { get; set; }

    public override void UpdateModel(TaskList model)
    {
        model.Title = Title;
        model.ListId = ListId;
        model.CreatedById = CreatedById;
    }
}