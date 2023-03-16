using backend.src.Models;

namespace backend.src.DTOs.SubTask;

public class SubTaskUpdateDTO : BaseDTO<TaskList>
{
    public string? Title { get; set; }
    public bool? Done { get; set; }

    public override void UpdateModel(TaskList model)
    {
        throw new NotImplementedException();
    }
}