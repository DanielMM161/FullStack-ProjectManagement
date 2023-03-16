namespace backend.src.Repositories.ProjectRepo;

using System.Collections.Generic;
using System.Threading.Tasks;
using backend.src.Db;
using backend.src.Models;
using backend.src.Repositories.BaseRepo;
using Microsoft.EntityFrameworkCore;

public class ProjectRepo : BaseRepo<Project>, IProjectRepo
{
    public ProjectRepo(AppDbContext context) : base(context)
    {}

    public async Task<ICollection<Project>> GetProjectsByUserAsync(int userId, int page, int pageSize)
    {
         var projects = await _context.Projects
            .AsNoTracking()
            .Include(p => p.Users)
            .Where(p => p.Users.Select(u => u.Id).Contains(userId))
            .Include(p => p.Lists)
                .ThenInclude(l => l.Tasks)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();        

        return projects;
    }
}