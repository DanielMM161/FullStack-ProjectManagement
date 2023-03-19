namespace backend.src.DTOs.Task;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using backend.src.Models;

public class TaskCreateDTO : BaseDTO<TaskList>
{
    [Required]
    public virtual string Title { get; set; } = null!;
    [Required]
    public int ListId { get; set; }
    [JsonIgnore]
    public int CreatedById { get; set; }
    [JsonIgnore]
    public int ProjectId { get; set; }

    public override void UpdateModel(TaskList model)
    {
        throw new NotImplementedException();
    }
}