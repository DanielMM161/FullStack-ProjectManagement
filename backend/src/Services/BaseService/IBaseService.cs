namespace backend.src.Services.BaseService;

using backend.src.Repositories.BaseRepo;

public interface IBaseService<T, TReadDto, TCreateDto, TUpdateDto>
{
    Task<IEnumerable<TReadDto>> GetAllAsync(QueryOptions options);
    Task<TReadDto> CreateOneAsync (TCreateDto create);
    Task<TReadDto?> GetByIdAsync(int id);
    Task<TReadDto> UpdateOneAsync(int id, TUpdateDto update);
    Task<bool> DeleteOneAsync(int id);
}