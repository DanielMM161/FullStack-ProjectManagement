namespace backend.Models;

public class Project : BaseModel
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
}