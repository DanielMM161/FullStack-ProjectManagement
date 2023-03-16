namespace backend.src.DTOs.List;

using backend.src.DTOs.Task;
using backend.src.Models;

public class ListReadDTO : BaseDTO<List>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public ICollection<TaskReadDTO>? Tasks { get; set; }

    public override void UpdateModel(List model)
    {
        throw new NotImplementedException();
    }
}