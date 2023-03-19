namespace backend.src.Repositories.ListRepo;

using backend.src.Db;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

public class ListRepo : BaseRepo<List>, IListRepo
{
    public ListRepo(AppDbContext context) : base(context)
    {}

    public async Task<ICollection<List>> GetListByProjectAsync(int projectId)
    {
        return await _context.Lists
            .AsNoTracking()
            // No subtasks
            .Include(l => l.Tasks.Where(t => t.ParentId == null))
            .Where(list => list.ProjectId == projectId)
            .ToListAsync();        
    }
}