namespace backend.Services.Impl;

using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Db;
using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

public class DbCrudService<TModel, TDto> : ICrudService<TModel, TDto>
    where TModel : BaseModel, new()
    where TDto : BaseDTO<TModel>
{
    protected readonly AppDbContext _dbContext;

    public DbCrudService(AppDbContext dbContext) => _dbContext = dbContext;

    public async virtual Task<ICollection<TModel>?> GetAllAsync()
    {
        return await _dbContext.Set<TModel>().AsNoTracking().ToListAsync();
    }

    public async virtual Task<TModel?> GetAsync(int id)
    {
        return await _dbContext.Set<TModel>().FindAsync(id);
    }

    public async virtual Task<TModel?> CreateAsync(TDto request)
    {
        var item = new TModel();
        request.UpdateModel(item);
        _dbContext.Add(item);
        await _dbContext.SaveChangesAsync();
        return item;
    }

    public async Task<TModel?> UpdateAsync(int id, TDto request)
    {
        var item = await GetAsync(id);
        if (item is null) 
        {
            return null;
        }
        request.UpdateModel(item);
        _dbContext.Update(item);
        await _dbContext.SaveChangesAsync();
        return item;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var item = await GetAsync(id);
        if (item is null) 
        {
            return false;
        }
        await _dbContext.SaveChangesAsync();
        return true;
    }
}