namespace backend.src.Models;

using System.ComponentModel.DataAnnotations;

public class List : BaseModel
{
    [MaxLength(50)]
    public string Title { get; set; } = null!;
    
    public ICollection<TaskList>? Tasks { get; set; }
    
    public Project Project { get; set; } = null!;

    public int ProjectId { get; set; }
}