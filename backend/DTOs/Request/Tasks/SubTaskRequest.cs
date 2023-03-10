namespace backend.DTOs.Request.Tasks;

using System.ComponentModel.DataAnnotations;
using backend.Models;

public class SubTaskRequest : BaseDTO<TaskList>
{
    [Required]
    public string Title { get; set; } = null!;

    public override void UpdateModel(TaskList model)
    {
        model.Title = Title;
    }
}