namespace backend.Services.Impl;

using backend.DTOs.Request;
using backend.Models;
using backend.Services.Interfaces;
using backend.Db;
using backend.DTOs.Response;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

public class DbProjectService : DbCrudService<Project, ProjectRequest>, IProjectService
{
    public DbProjectService(AppDbContext context) : base(context)
    {}

    public override async Task<Project> CreateAsync(ProjectRequest request)
    {
        var users = _dbContext.Users
            .Where(u => request.UsersId.Contains(u.Id))
            .ToList();

        var project = new Project
        {
            Name = request.Name,
            Description = request.Description,
            Users = users
        };

        _dbContext.Add(project);
        await _dbContext.SaveChangesAsync();

        return project;
    }

    public async Task<bool> AddUserAsync(int projectId, ICollection<int> usersId)
    {
        var project = await GetAsync(projectId);
        if (project is null)
        {
            return false;
        }

        var users = await _dbContext.Users
            .Where(u => usersId.Contains(u.Id))
            .ToListAsync();

         Console.WriteLine($"1 -- depues where {projectId} {users == null} {users.Count}");

        foreach (var user in users)
        {
            if(!project.Users.Contains(user)) 
            {
                project.Users.Add(user);
            }
        }
        await _dbContext.SaveChangesAsync();

        Console.WriteLine($"2 -- antes de return {usersId.Count}");
        return true;
    }

    public async Task<bool> RemoveUserAsync(int projectId, ICollection<int> usersId)
    {
        var project = await GetAsync(projectId);
        if (project is null)    
        {
            return false;
        }

        var users = await _dbContext.Users
            .Where(u => usersId.Contains(u.Id))
            .ToListAsync();

        foreach (var user in users)
        {
            if(project.Users.Contains(user)) 
            {
                project.Users.Remove(user);
            }
        }
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<ICollection<Project>?> GetProjectsByUserAsync(int userId)
    {
        var projects = await _dbContext.Projects
            .AsNoTracking()
            .Include(p => p.Users)
            .Where(p => p.Users.Select(u => u.Id).Contains(userId))
            .ToListAsync();

        return projects;
    }

    public override async Task<Project?> GetAsync(int id)
    {
        var project = await _dbContext.Projects
            .Include(p => p.Users)
            .SingleOrDefaultAsync(p => p.Id == id);

        return project;
    }
}