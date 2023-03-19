namespace backend.src.Repositories.SubTaskRepo;

using backend.src.Db;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

public class SubTaskRepo : BaseRepo<TaskList>, ISubTaskRepo
{
    public SubTaskRepo(AppDbContext context) : base(context)
    {}

    public async Task<ICollection<TaskList>> GetSubTaskByParent(int parentId)
    {
        return await _context.Tasks.Where(t => t.ParentId == parentId).ToListAsync();
    }
}