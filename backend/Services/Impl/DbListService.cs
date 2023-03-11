namespace backend.Services.Impl;

using System.Threading.Tasks;
using backend.Db;
using backend.DTOs.Request;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class DbListService : IListService
{
    protected readonly AppDbContext _dbContext;

    public DbListService(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<List?> CreateListAsync(ListRequest request)
    {
        var list = new List();
        var project = await _dbContext.Projects.SingleOrDefaultAsync(p => p.Id == request.ProjectId);;
        if (project is null)
        {
            return null;
        }

        request.UpdateModel(list);
        project.Lists.Add(list);
        _dbContext.Add(list);
        await _dbContext.SaveChangesAsync();
        
        return list;
    }

    public async Task<ICollection<List>> GetListByProjectAsync(int projectId)
    {
        return await _dbContext.Lists
            .AsNoTracking()
            .Where(list => list.ProjectId == projectId)
            .ToListAsync();        
    }

    public async Task<List?> Update(int listId, string title)
    {
        var list = await GetList(listId);
        if (list is null)
        {
            return null;
        }
        list.Title = title;
        //TODO TEST WITHOUT _DB.Update();
        await _dbContext.SaveChangesAsync();
        return list;
    }

        public async Task<bool> Delete(int listId)
    {
        var list = await GetList(listId);
        if (list is null)
        {
            return false;
        }
        _dbContext.Lists.Remove(list);
        await _dbContext.SaveChangesAsync();
        return true;
    }

    private async Task<List?> GetList(int listId)
    {
        return await _dbContext.Set<List>().FindAsync(listId);
    }
}