namespace backend.src.DTOs.List;

using backend.src.DTOs.Task;
using backend.src.Models;

public class ListReadDTO : BaseDTO<List>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public ICollection<ListTaskReadDTO>? Tasks { get; set; }
}