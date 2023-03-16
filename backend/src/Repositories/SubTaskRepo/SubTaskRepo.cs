namespace backend.src.Repositories.SubTaskRepo;

using backend.src.Db;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;

public class SubTaskRepo : BaseRepo<TaskList>, ISubTaskRepo
{
    public SubTaskRepo(AppDbContext context) : base(context)
    {}
}