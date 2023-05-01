namespace backend.src.Repositories.BaseRepo;

using backend.src.Db;
using backend.src.Models;
using Microsoft.EntityFrameworkCore;

public class BaseRepo<T> : IBaseRepo<T>
    where T : BaseModel
{
    protected readonly AppDbContext _context;

    public BaseRepo(AppDbContext context)
    {
        _context = context;
    }

    public virtual async Task<T?> CreateOneAsync(T create)
    {
        await _context.AddAsync(create);
        await _context.SaveChangesAsync();        
        return create;
    }

    public async Task<bool> DeleteOneAsync(T entity)
    {
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<T>> GetAllAsync(QueryOptions? options)
    {
        var query = _context.Set<T>().AsNoTracking();
        if (options != null && options.Sort.Trim().Length > 0)
        {
            if (query.GetType().GetProperty(options.Sort) != null)
            {
                query.OrderBy(e => e.GetType().GetProperty(options.Sort));
            }
            query.Take(options.Limit).Skip(options.Skip);
        }
        return await query.ToArrayAsync();
    }

    public virtual async Task<T?> GetByIdAsync(int id)
    {        
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<T> UpdateOneAsync(T update)
    {        
        _context.Update<T>(update);
        await _context.SaveChangesAsync();
        return update;
    }
}