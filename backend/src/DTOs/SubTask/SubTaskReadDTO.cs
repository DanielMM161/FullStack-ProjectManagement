using backend.src.Models;

namespace backend.src.DTOs.SubTask;

public class SubTaskReadDTO : BaseDTO<TaskList>
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public bool? Done { get; set; }

    public override void UpdateModel(TaskList model)
    {
        throw new NotImplementedException();
    }
}