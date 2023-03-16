namespace backend.src.DTOs.Response.List;

using backend.src.DTOs.Response.TaskList;
using backend.src.Models;

public class ListByProjectResponse : BaseModel
{
    public string Title { get; set; } = null!;
    public ICollection<TaskResponse>? Tasks { get; set; }

    public static ListByProjectResponse FromList(List list)
    {
        var taskResponse = list.Tasks.Select(t => TaskResponse.FromTaskList(t)).ToList();
        return new ListByProjectResponse
        {
            Id = list.Id,
            Title = list.Title,
            Tasks = taskResponse
        };
    }
}