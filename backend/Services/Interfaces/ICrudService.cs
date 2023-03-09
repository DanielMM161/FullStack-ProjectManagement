namespace backend.Services.Interfaces;

public interface ICrudService<TModel, TDto>
{
    Task<TModel?> CreateAysnc(TDto request);
    Task<ICollection<TModel>?> GetAllAsync();
    Task<TModel?> GetAsync(int id);
    Task<bool> DeleteAsync(int id);
    Task<TModel?> UpdateAsync(int id, TDto request);

}