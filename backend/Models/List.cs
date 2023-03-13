namespace backend.Models;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class List : BaseModel
{
    [MaxLength(50)]
    public string Title { get; set; } = null!;

    [JsonIgnore]
    public ICollection<TaskList>? Tasks { get; set; }

    [JsonIgnore]
    public Project Project { get; set; } = null!;

    public int ProjectId { get; set; }
}