namespace backend.src.Repositories.TaskRepo;

using backend.src.Db;
using backend.src.Helpers;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;

public class TaskRepo : BaseRepo<TaskList>, ITaskRepo
{
    public TaskRepo(AppDbContext context) : base(context)
    {}
}