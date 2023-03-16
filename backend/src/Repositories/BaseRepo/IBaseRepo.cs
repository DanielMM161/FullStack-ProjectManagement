namespace backend.src.Repositories.BaseRepo;

public interface IBaseRepo<T>
{
    Task<IEnumerable<T>> GetAllAsync(QueryOptions options);
    Task<T?> GetByIdAsync(int id);
    Task<T> UpdateOneAsync(int id, T update);
    Task<bool> DeleteOneAsync(int id);
    Task<T?> CreateOneAsync (T create);
}

public class QueryOptions
{
    public string Sort { get; set; } = string.Empty;    
    public SortBy SortBy { get; set; }
    public int Limit { get; set; } = 30;
    public int Skip { get; set; } = 0;
}

public enum SortBy
{
    ASC,
    DESC
}