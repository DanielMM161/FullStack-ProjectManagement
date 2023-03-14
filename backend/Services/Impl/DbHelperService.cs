using backend.Db;
using backend.Models;
using backend.Services.Interfaces;

namespace backend.Services.Impl;
using Microsoft.EntityFrameworkCore;

public class DbHelperService : IHelpserService
{
    private readonly AppDbContext _dbContext;
    
    public DbHelperService(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<int> CheckUserBelongProject(int userId, Project project)
    {       
        var usersId = project.Users.Select(u => u.Id).ToList();
        return usersId.IndexOf(userId);        
    }

    public async Task<Project?> CheckProject(int projectId)
    {
        var project = await _dbContext.Projects
            .Include(p => p.Users)
            .SingleOrDefaultAsync(p => p.Id == projectId);
        if (project is null)
        {
            return null;
        }
        return project;
    }

    public async Task<List?> CheckListBelongProject(int listId, int projectId)
    {
        var list = await _dbContext.Lists
            .SingleOrDefaultAsync(l => l.Id == listId);
        if (list is null || list.ProjectId != projectId)
        {
            return null;    
        }
        return list;
    }
}